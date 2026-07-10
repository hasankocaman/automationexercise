// supabase/functions/trending-skills-sync/index.ts
//
// Daily cron job (GitHub Actions → this function, see
// .github/workflows/trending-skills-cron.yml) that rebuilds the "trending
// QA/test-automation skills" homepage widget data:
//   1. Pull live QA/Test Automation job postings from JSearch (RapidAPI).
//   2. Batch the postings (BATCH_SIZE per call) to Groq, asking ONLY for the
//      skill list per posting — never ask the LLM to count/aggregate across
//      postings, that happens here in TS deterministically. LLMs are
//      unreliable at precise counting over many items in one pass; skill
//      *extraction* per posting is a much easier, more reliable task.
//   3. Log one row per (skill, posting) into job_skill_snapshots for today.
//   4. Recompute trending_skills from the trailing WINDOW_DAYS of snapshots
//      (truncate + insert) so stale skills fall out on their own instead of
//      accumulating forever under a naive UPSERT-increment scheme.
//
// Auth: this is NOT a user-facing function — it must be deployed with
// --no-verify-jwt and is instead gated by a shared secret header
// (x-cron-secret) checked against CRON_INVOKE_SECRET, sent only by the
// GitHub Actions workflow. Writes use the service-role client
// (SUPABASE_SERVICE_ROLE_KEY, auto-injected by Supabase into every edge
// function — not something we set ourselves).
//
// Deploy: supabase functions deploy trending-skills-sync --project-ref <ref> --no-verify-jwt
// Secrets needed: RAPIDAPI_KEY, CRON_INVOKE_SECRET (GROQ_API_KEY already set
// for qa-assistant/grade-interview-answer/explain-quiz-answer).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const JOB_SEARCH_QUERY = 'QA Engineer OR Test Automation Engineer OR SDET'
const TARGET_POSTINGS = 25
const BATCH_SIZE = 5
const WINDOW_DAYS = 7
const MAX_DESCRIPTION_CHARS = 1500

const SKILL_EXTRACTION_SYSTEM_PROMPT = `You are a technical recruiter assistant. You will be given a numbered list of QA / test automation job postings (title + description). For EACH posting, extract the concrete technical skills, tools, frameworks and practices explicitly required or mentioned (e.g. "Playwright", "Selenium", "API Testing", "CI/CD", "Kubernetes", "LLM testing", "RAG testing"). Do NOT count, rank or aggregate anything across postings — just list the distinct skills for that single posting, deduplicated within it, using short canonical names (e.g. "Playwright", not "Playwright.js" or "playwright framework").

Respond with ONLY a JSON array, no markdown fences, no extra text, in this exact shape:
[{"jobTitle": "...", "skills": ["...", "..."]}, ...]

The array must have exactly as many entries as postings given, in the same order.`

type JSearchJob = { job_title?: string; job_description?: string }
type SkillExtraction = { jobTitle: string; skills: string[] }

function jsonResponse(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function extractJsonArray(text: string): unknown {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const raw = fenced ? fenced[1] : text
    return JSON.parse(raw.trim())
}

async function fetchJobPostings(rapidApiKey: string): Promise<JSearchJob[]> {
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(JOB_SEARCH_QUERY)}&num_pages=1&page=1`
    const response = await fetch(url, {
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
    })
    if (!response.ok) {
        const errText = await response.text()
        throw new Error(`JSearch API error (HTTP ${response.status}): ${errText.slice(0, 300)}`)
    }
    const result = await response.json()
    const jobs: JSearchJob[] = Array.isArray(result?.data) ? result.data : []
    return jobs.slice(0, TARGET_POSTINGS)
}

function chunk<T>(items: T[], size: number): T[][] {
    const out: T[][] = []
    for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
    return out
}

async function extractSkillsForBatch(groqApiKey: string, batch: JSearchJob[]): Promise<SkillExtraction[]> {
    const listing = batch
        .map((job, i) => {
            const title = (job.job_title ?? 'Unknown').slice(0, 200)
            const description = (job.job_description ?? '').slice(0, MAX_DESCRIPTION_CHARS)
            return `${i + 1}. TITLE: ${title}\nDESCRIPTION: ${description}`
        })
        .join('\n\n')

    const raw = await callGroq(
        groqApiKey,
        [
            { role: 'system', content: SKILL_EXTRACTION_SYSTEM_PROMPT },
            { role: 'user', content: listing },
        ],
        { temperature: 0.1, maxTokens: 1500 }
    )

    try {
        const parsed = extractJsonArray(raw)
        if (!Array.isArray(parsed)) return []
        return parsed
            .filter((entry): entry is SkillExtraction => Array.isArray(entry?.skills))
            .map((entry) => ({
                jobTitle: String(entry.jobTitle ?? '').slice(0, 200),
                skills: entry.skills.map((s: unknown) => String(s).trim()).filter(Boolean),
            }))
    } catch (err) {
        console.error('trending-skills-sync: Groq batch returned unparseable JSON, skipping batch', err, raw.slice(0, 300))
        return []
    }
}

Deno.serve(async (req) => {
    try {
        const cronSecret = Deno.env.get('CRON_INVOKE_SECRET')
        if (!cronSecret || req.headers.get('x-cron-secret') !== cronSecret) {
            return jsonResponse({ error: 'Unauthorized' }, 401)
        }

        const rapidApiKey = Deno.env.get('RAPIDAPI_KEY')
        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!rapidApiKey || !groqApiKey) {
            return jsonResponse({ error: 'RAPIDAPI_KEY or GROQ_API_KEY not configured' }, 500)
        }

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const postings = await fetchJobPostings(rapidApiKey)
        if (postings.length === 0) {
            return jsonResponse({ error: 'JSearch returned no postings' }, 502)
        }

        const batches = chunk(postings, BATCH_SIZE)
        const extractionResults = await Promise.all(batches.map((batch) => extractSkillsForBatch(groqApiKey, batch)))
        const extractions = extractionResults.flat()

        // Deterministic aggregation — the LLM only ever extracts per-posting
        // skill lists above, it never counts across postings.
        const today = new Date().toISOString().slice(0, 10)
        const snapshotRows: { run_date: string; skill_name: string; job_title: string; source: string }[] = []
        for (const { jobTitle, skills } of extractions) {
            for (const skill of skills) {
                snapshotRows.push({ run_date: today, skill_name: skill, job_title: jobTitle, source: 'jsearch' })
            }
        }

        if (snapshotRows.length === 0) {
            return jsonResponse({ error: 'No skills extracted from any posting' }, 502)
        }

        const { error: insertError } = await supabase.from('job_skill_snapshots').insert(snapshotRows)
        if (insertError) throw new Error(`snapshot insert failed: ${insertError.message}`)

        // Recompute trending_skills from the trailing WINDOW_DAYS of snapshots
        // so skills that stop appearing in postings fall out on their own.
        const windowStart = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        const { data: windowRows, error: windowError } = await supabase
            .from('job_skill_snapshots')
            .select('skill_name, job_title')
            .gte('run_date', windowStart)
        if (windowError) throw new Error(`window read failed: ${windowError.message}`)

        const rollup = new Map<string, { frequency: number; jobTitles: Set<string> }>()
        for (const row of windowRows ?? []) {
            const entry = rollup.get(row.skill_name) ?? { frequency: 0, jobTitles: new Set<string>() }
            entry.frequency += 1
            entry.jobTitles.add(row.job_title)
            rollup.set(row.skill_name, entry)
        }

        const trendingRows = Array.from(rollup.entries()).map(([skill_name, { frequency, jobTitles }]) => ({
            skill_name,
            frequency,
            last_seen_in: Array.from(jobTitles).slice(0, 5),
            window_days: WINDOW_DAYS,
            updated_at: new Date().toISOString(),
        }))

        const { error: deleteError } = await supabase.from('trending_skills').delete().not('skill_name', 'is', null)
        if (deleteError) throw new Error(`trending_skills truncate failed: ${deleteError.message}`)

        const { error: insertTrendingError } = await supabase.from('trending_skills').insert(trendingRows)
        if (insertTrendingError) throw new Error(`trending_skills insert failed: ${insertTrendingError.message}`)

        return jsonResponse({
            ok: true,
            postingsFetched: postings.length,
            skillsExtracted: snapshotRows.length,
            distinctSkills: trendingRows.length,
        })
    } catch (err) {
        console.error('trending-skills-sync error:', err)
        return jsonResponse({ error: err instanceof Error ? err.message : 'Unknown error' }, 500)
    }
})
