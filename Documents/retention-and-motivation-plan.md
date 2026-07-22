# Retention & Motivation Plan — Learning OS Faz 2.4 + Faz 3 Devamı + Sosyal Kanıt

> **Bu dosya nedir:** Kullanıcının learnqa.dev için dışarıdan aldığı bir
> "eğitim psikolojisi değerlendirmesi" yorumunun (2026-07-22) incelenmesi
> sonucu ortaya çıkan, `Documents/learning-os-redesign-plan.md`'nin **Faz 2.4
> ve Faz 3** bölümlerini somutlaştıran + o planda hiç yer almayan yeni bir
> fikir (ambient sosyal kanıt) ekleyen uygulama planıdır.
>
> **Okuma sırası:** Önce `CLAUDE.md`, sonra `.claude/NEXT_SESSION.md`, sonra
> `Documents/learning-os-redesign-plan.md` (bu dosyanın ebeveyni — mastery
> formülü, streak/grace algoritması, event kalıbı orada tanımlı, burada
> TEKRAR EDİLMEZ), sonra bu dosya.
>
> **Branch:** `feature/retention-and-motivation`

---

## 1. Neden bu dosya var — Dış Değerlendirme vs. Gerçek Durum

Kullanıcı, sitenin motivasyon/gamification eksiklerine dair genel bir
değerlendirme yapıştırdı (rozet yok, streak yok, spaced repetition yok,
mastery learning yok, sosyal kanıt yok vb.). Kod tabanı incelendiğinde bu
değerlendirmenin **`learning-os-redesign-plan.md`'nin Faz 1 ve Faz 2'sinin
(2026-07-19 → 2026-07-20 arası tamamlandı) hiç farkında olmadan yazıldığı**
görüldü — önerilerin çoğu zaten var:

| Dış yorumun dediği | Gerçek durum | Kaynak |
|---|---|---|
| Rozet, ilerleme görünürlüğü, streak yok | Grace kurallı streak (❄️ donma), günlük hedef bar'ı, 12 haftalık heatmap | `src/lib/activityLog.js`, `src/components/ActivityHeatmap.jsx` |
| Spaced Repetition (Ebbinghaus) yok | Leitner-lite tekrar kuyruğu (1→3→7 gün, 3 doğru streak'te mezuniyet) | `src/lib/reviewQueue.js` |
| Mastery Learning (%80 eşik) yok | Ders bitirme rozeti (%100 sekme) + mülakat %80 rozeti + 0-100 mastery skoru | `LessonFinishBadge.jsx`, `progressStore.js::getMastery` |
| İlerleme/roadmap görünürlüğü yok | `/qa-mentor` v2: sihirbaz, kariyer haritası, Skill Radar, Job Readiness kartı | `QAMentorPage.jsx`, `SkillRadar.jsx` |
| Social Learning (Bandura) yok | **Kısmen doğru** — `/leaderboard` var ama üyelik gerektiren rekabetçi bir yüzey; ambient/pasif sosyal kanıt (yorumun kastettiği "bu dersi bitirenler" tarzı) YOK | — |

**Sonuç:** Bu plan, zaten var olanı yeniden icat etmez. Sadece
`learning-os-redesign-plan.md`'nin kendi kabul ettiği iki bitmemiş parçasını
(§6.4 Retention v2, §7 Faz 3'ün bir alt kümesi) uygular ve gerçekten yeni olan
tek boşluğu (sosyal kanıt) ekler. Ayrıca düşük efor/yüksek etkili bir metin
işi (Job Readiness kademeli mesajı) plana dahil edildi çünkü mevcut kart ham
yüzde gösteriyor, dış yorumun önerdiği "Junior seviyesine yaklaşıyorsun" tarzı
anlamlı çerçeveleme hiç yok.

---

## 2. Kapsam — 4 Aşama

### Aşama A — Job Readiness Kademeli Motivasyon Metni (düşük risk)
**Dosyalar:** `src/lib/progressStore.js`, `src/components/SkillRadar.jsx`

- `progressStore.js`'e `getJobReadinessTier(score)` eklenir: skor eşiklerine
  göre bilingual etiket + bir cümlelik motivasyon metni döner (ör. 0-24
  "Yeni Başlıyorsun", 25-49 "Temelleri Atıyorsun", 50-74
  "Junior'a Yaklaşıyorsun", 75-89 "Junior Seviyesindesin", 90-100
  "Mid-level'a Hazırsın"). Eşik sayıları named const olarak dosya başında.
- `JobReadinessCard` (`SkillRadar.jsx`) bu etiketi ham yüzdenin yanına,
  mevcut kart düzenini bozmadan ekler — yeni component YOK, sadece mevcut
  kartın içeriği genişler.
- Kazandıran ton kuralı (plan §10 risk 7 ile aynı ilke): en düşük tier bile
  "başarısızsın" değil "yeni başlıyorsun" diye çerçevelenir.

### Aşama B — Faz 2.4 Retention v2 (learning-os-redesign-plan.md §6.4)
**Dosyalar:** `src/lib/progressStore.js`, `src/components/HomePage.jsx`

- `progressStore.js`'e `getWeakCompletedTopics()` eklenir: `getCompletedRoutes()`
  içindeki route'lardan `getMastery(route) < 50` olanları döner (plandaki
  formül AYNEN kullanılır, yeniden tanımlanmaz).
- HomePage "Bugün" şeridine (mevcut streak/hedef/tekrar kartlarının yanına)
  koşullu bir "zayıf konu tekrar önerisi" kartı eklenir — sadece
  `getWeakCompletedTopics().length > 0` iken görünür, ilk 1-2 route'a link
  verir. Var olan CTA/kart görsel diliyle (rounded-2xl, dark/light class
  kalıbı) tutarlı olmalı.
- Reset/tamamlanma sinyalleri değişmez; bu sadece salt-okunur yeni bir
  görünüm yüzeyidir.

### Aşama C — Ambient Sosyal Kanıt (yeni fikir, plan dışı)
**Dosyalar:** `supabase/social_proof_schema.sql` (yeni), `src/lib/socialProof.js` (yeni), `src/components/LessonFinishBadge.jsx`

- Kişisel veri İÇERMEYEN, tamamen agregat bir sayaç: "Bu dersi şimdiye kadar
  bitirenler" — mevcut `map_events` tablosundaki ders bitirme event'inden
  (`lesson_completed` gibi, yoksa yeni bir event adıyla mevcut kalıba
  eklenir) `count(distinct anon_id)` alan bir Postgres RPC.
- `mapEvents.js`'teki **fire-and-forget, asla akışı bloklamayan** kalıp
  BİREBİR taklit edilir: RPC yoksa/hata verirse sayaç sessizce gizlenir,
  hiçbir zaman hata göstermez veya loading spinner'la kullanıcıyı bekletmez.
- `LessonFinishBadge.jsx`'in "done" durumuna küçük bir satır eklenir (ör.
  "🎉 X kişi bu dersi tamamladı" / "X people finished this lesson") —
  sayı 5'in altındaysa hiç gösterilmez (küçük sayılar motive etmez, tam
  tersi izlenim verir).
- **Manuel adım (credential gerektirir, CLAUDE.md §13):** Yeni RPC/SQL
  kullanıcı tarafından Supabase SQL Editor'da elle çalıştırılmalı — kod
  tarafı hazırlanır, adımlar bu dosyaya ve NEXT_SESSION.md'ye net yazılır.
  Bu adım tamamlanana kadar özellik "sessizce gizli" durumda kalır (RPC yok
  → sayaç hiç render olmaz), yani sitenin geri kalanı bu adımdan bağımsız
  çalışır.

### Aşama D — Faz 3'ten bir dilim: Mobil Mikro-Oturum Çerçevelemesi (learning-os-redesign-plan.md §7)
**Dosyalar:** `src/components/HomePage.jsx`

- Dış yorumun "Flow State — dersler çok uzun/kısa olmamalı" endişesine
  doğrudan cevap: mevcut "Bugünkü Tekrar" kartına (`review-queue-card`)
  açık bir süre tahmini rozeti eklenir (`~N dk`, `Math.min(dueReviewCount,
  REVIEW_QUEUE_SESSION_SIZE) × ~30sn`) — açık bir zaman taahhüdü, düşük
  bağlılık hissi verir ve kullanıcının "bu ne kadar sürer" belirsizliğini
  kaldırır.
- **Bilinçli kapsam daraltması (uygulama sırasında bulundu):** Planın
  ikinci alternatifi ("kaldığı sekmenin kalan quiz sayısı ≤3 ise o sekmeye
  link") `progressStore.js`'in mevcut `MASTERY_MANIFEST`'inde SADECE
  sayfa-seviyesi toplam quiz/egzersiz sayısını tutuyor, **sekme-seviyesi
  kalan quiz sayısını TUTMUYOR** — bunu eklemek manifest şemasını
  genişletmeyi gerektirir (yeni bir mühendislik işi, bu aşamanın "ince
  çerçeveleme" hedefinin dışına taşar). Bu yüzden SADECE review-queue
  tabanlı mikro-oturum çerçevelemesi uygulandı; ikinci alternatif backlog'da
  kalır. Yeni bir oturum motoru/zamanlayıcı YAZILMADI — var olan review-queue
  altyapısının üstüne ince bir kopya/çerçeveleme katmanıdır.

---

## 3. Kısıtlar ve İlkeler (CLAUDE.md ile hizalı, tekrar değil hatırlatma)

- Local-first: A/B/D üyelik gerektirmez. C (sosyal kanıt) zaten anonim
  `anon_id` ile üyeliksiz de çalışır (mevcut `mapEvents.js` kalıbı).
- Yeni dış kütüphane/CDN yok. Yeni localStorage anahtarı icat edilmez (B, D
  var olan anahtarları okur).
- Kilitleme yok — bu 4 aşama da öneri/görünürlük katmanıdır, hiçbir içeriği
  gizlemez veya zorunlu kılmaz.
- Her yeni metin bilingual (`{tr, en}` veya `language === 'tr'` dalı).
- Ölçmeden karar yok: C zaten `map_events`'ten beslenir; B/D için ayrı event
  eklenmez (mevcut event altyapısı yeterli, plan §5-F5/§9-S5 ile çakışmasın).

---

## 4. Kapanış Ritüeli — Her Aşama İçin (kullanıcı talimatı, 2026-07-22)

Kullanıcının istediği döngü, her aşama (A/B/C/D) için ayrı ayrı uygulanır:

```
1. Aşamayı kodla (dosyalar yukarıda listelendi)
2. Hızlı doğrulama: node scripts/check-content-integrity.mjs (0 ihlal) + npm run build (PASS)
   — CLAUDE.md §1.1'in "test etmeden" ile kastedilmeyen, ATLANAMAYAN iki maddesi
   (bu proje tarihinde §9.6 rollout'unda da aynı ayrım kullanıldı: Playwright
   E2E atlanır, content-integrity + build atlanmaz)
3. .claude/NEXT_SESSION.md güncelle — ne yapıldı, doğrulama sonucu, sıradaki aşama
4. SKIP_E2E_HOOK=1 git commit (Playwright E2E bu turda ÇALIŞTIRILMAZ — post-commit
   hook'u bilinçli atlanır, tam paket tüm aşamalar bitince BİR KEZ koşulur)
5. Sıradaki aşamaya geç
```

**Tüm aşamalar bitince (kapanış):** `npm run test:e2e` tam paket bir kez
koşulur, sonucu NEXT_SESSION.md'ye yazılır — tıpkı §9.6 Framework Mimarisi
rollout'unun kapanışında yapıldığı gibi.

---

## 5. Aşama Durumu

| Aşama | Durum |
|---|---|
| A — Job Readiness kademeli metin | ✅ Tamamlandı |
| B — Retention v2 (zayıf konu önerisi) | ✅ Tamamlandı |
| C — Ambient sosyal kanıt | ✅ Kod tarafı tamam — Supabase SQL Editor'da `social_proof_schema.sql`'in elle çalıştırılması bekleniyor |
| D — Mikro-oturum zaman çerçevesi | ✅ Tamamlandı (2. alternatif bilinçli olarak backlog'da bırakıldı) |

Güncel durum ve doğrulama kayıtları için tek kaynak: `.claude/NEXT_SESSION.md`.
