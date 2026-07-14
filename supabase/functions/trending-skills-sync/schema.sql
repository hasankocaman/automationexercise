-- supabase/functions/trending-skills-sync/schema.sql
--
-- Repo has no tracked migration history (no supabase/migrations dir) — DB
-- schema changes here are applied by hand in the Supabase SQL Editor, same as
-- every other table in this project. Run this once before the first deploy
-- of the trending-skills-sync function.
--
-- Design: job_skill_snapshots is an append-only log (one row per skill
-- mention per job posting per day). trending_skills is a materialized
-- rollup, fully rebuilt (truncate + insert) from the trailing WINDOW_DAYS of
-- snapshots on every cron run — this is what makes "trending" actually mean
-- "trending this week" instead of "accumulated forever since the first run".

create table if not exists job_skill_snapshots (
  id bigint generated always as identity primary key,
  run_date date not null default current_date,
  skill_name text not null,
  job_title text not null,
  source text not null default 'jsearch',
  created_at timestamptz not null default now()
);

create index if not exists idx_job_skill_snapshots_run_date
  on job_skill_snapshots (run_date);

create table if not exists trending_skills (
  skill_name text primary key,
  frequency int not null,
  last_seen_in text[] not null default '{}',
  window_days int not null default 7,
  updated_at timestamptz not null default now()
);

-- Singleton row describing the most recent sync run — lets the homepage
-- widget show "what was actually scanned" (date range, source platforms,
-- posting count) instead of a static/generic caption.
create table if not exists trending_skills_meta (
  id smallint primary key default 1,
  window_start date not null,
  window_end date not null,
  postings_scanned int not null,
  sources text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint trending_skills_meta_singleton check (id = 1)
);

alter table job_skill_snapshots enable row level security;
alter table trending_skills enable row level security;
alter table trending_skills_meta enable row level security;

-- trending_skills is the public-facing rollup — homepage widget reads it
-- with the anon key, same pattern as the public leaderboard.
drop policy if exists "trending_skills public read" on trending_skills;
create policy "trending_skills public read"
  on trending_skills for select
  using (true);

drop policy if exists "trending_skills_meta public read" on trending_skills_meta;
create policy "trending_skills_meta public read"
  on trending_skills_meta for select
  using (true);

-- job_skill_snapshots has NO public policy at all: only the service-role
-- client (used exclusively inside the trending-skills-sync edge function)
-- can read/write it, since service-role bypasses RLS entirely. Anon/auth'd
-- users must never see or write raw per-posting snapshot rows.
