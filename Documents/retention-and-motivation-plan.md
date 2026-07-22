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
| C — Ambient sosyal kanıt | ✅ Tamamlandı — manuel SQL adımı hem prod hem test ortamında çalıştırıldı |
| D — Mikro-oturum zaman çerçevesi | ✅ Tamamlandı (2. alternatif bilinçli olarak backlog'da bırakıldı) |
| C.2 — Zaman bazlı sosyal kanıt + fallback | ⏳ Kabul edildi, HENÜZ UYGULANMADI (bkz. §6.1) |
| A.1 — Job Readiness metin cilası | ⏳ Kabul edildi, HENÜZ UYGULANMADI (bkz. §6.1) |
| E — Homepage hero cilası + Onboarding turu | ⏳ Kabul edildi (yumuşatılmış), HENÜZ UYGULANMADI (bkz. §6.4) |

Güncel durum ve doğrulama kayıtları için tek kaynak: `.claude/NEXT_SESSION.md`.

---

## 6. Dış Geri Bildirim İncelemesi — 2. Tur (2026-07-22)

> A/B/C/D uygulanıp kapanış testi geçtikten sonra kullanıcı iki ayrı geri
> bildirim yapıştırdı: (1) mevcut C/A/B aşamalarına somut iyileştirme
> önerileri, (2) önceki konuşmalardan bağımsız, yeni bir bakış açısıyla
> homepage/onboarding fikri. Her madde kod gerçeğine karşı denetlendi —
> körü körüne kabul edilmedi (learning-os-redesign-plan.md §3'teki
> "kabul/red/yumuşatma" disiplini burada da uygulanır).

### 6.1 Kabul edilen — sıradaki artırımlar (henüz kodlanmadı)

**C.2 — Zaman bazlı sosyal kanıt ("Son 7 günde N kişi tamamladı"):** Fikir
sağlam — bir "tüm zamanlar" sayısından daha canlı/güncel hissettirir
(momentum sinyali). Ama körü körüne eklenirse gerçek bir tasarım sorunu
yaratır: haftalık pencere doğal olarak tüm-zamanlar toplamından KÜÇÜKTÜR,
bu yüzden mevcut `SOCIAL_PROOF_MIN_COUNT = 5` eşiği düşük trafikli
derslerde haftalık sayıyı neredeyse hiç göstermez hale getirir. Doğru
uygulama: RPC'ye `p_window_days` parametresi eklenir (`created_at >
now() - interval`), **önce haftalık sayı denenir, o eşiği geçemezse
tüm-zamanlar sayısına sessizce düşülür** (aynı "eksik veri asla 0 gibi
cezalandırılmaz" ilkesi, `progressStore.js::getMastery` ile aynı ruh).
Dosyalar: `supabase/social_proof_schema.sql` (yeni parametreli RPC veya
ikinci fonksiyon), `src/lib/socialProof.js`, `LessonFinishBadge.jsx`.

**A.1 — Job Readiness metin cilası:** Önerilen "Junior pozisyonlara
başvurmaya hazırsın" (75-89%) ve "Mid-level mülakatlara girebilirsin" (90+%)
ifadeleri, mevcut `JOB_READINESS_TIERS`'taki (`progressStore.js`) metinlerden
DAHA GÜÇLÜ — emir kipi ("başvur", "gir") betimleyici anlatımdan ("bilgiye
sahipsin") daha eyleme geçirici. Kabul edildi: iki üst kademenin `message`
alanı bu emir kipi tonuna çekilecek; diğer 3 kademe zaten aynı ruhta,
dokunulmayacak.

### 6.2 Reddedilen / yumuşatılan

**A/B testi altyapısı (sosyal kanıt kopyası için) → RED.** Projede HİÇBİR
deney/feature-flag altyapısı yok (bucketing, dönüşüm ölçümü, karşılaştırma
paneli — hiçbiri kurulu değil; `map_events` fire-and-forget bir funnel
tablosu, deney motoru değil). Tek bir metin varyasyonu için bunu sıfırdan
kurmak, CLAUDE.md'nin "ihtiyaç duyulmayan soyutlama ekleme" ilkesiyle
doğrudan çelişir. **Yumuşatılmış karşılık:** iki metin arasında GERÇEK bir
deney yapmak yerine, doğrudan daha sıcak olanı seç — "X kişi bu dersi
seninle birlikte tamamladı" ifadesi Bandura'nın sosyal öğrenme çerçevesine
("yalnız değilsin") "X kişi bitirdi" istatistiğinden daha uygun; C.2 ile
birlikte bu kopya da güncellenebilir, ayrı bir deney sistemi kurulmadan.

**Haftalık özet e-postası → Backlog, kapsam dışı.** Fikir kullanıcının
kendisi tarafından da "opsiyonel, ileride" olarak işaretlenmiş. Gerçek bir
gerilim var: e-posta göndermek bir e-posta adresi ister, e-posta adresi
üyelik ister — bu, CLAUDE.md §5'in "progress/rozet üyelik zorunlu değildir"
ilkesiyle DOĞRUDAN ÇELİŞMEZ (üyelik zaten opsiyonel bir senkron katmanı) ama
bu özelliğin doğası gereği SADECE üye kullanıcılara sunulabileceği açıkça
not düşülmeli. Ayrıca e-posta sağlayıcı seçimi, şablon, unsubscribe/rıza
yönetimi gibi ayrı bir altyapı kurulumu gerektirir — bu planın "ince
çerçeveleme" kapsamının tamamen dışında, ayrı bir plan dosyası/karar
gerektiren bir iş. Backlog'da tutulur, bu planın aşamalarına dahil EDİLMEDİ.

### 6.3 Zaten karşılanmış (yeni iş gerekmiyor)

**"Bu konuyu tekrar et butonu direkt ilgili derse link versin" (Retention
v2):** Bu ZATEN Aşama B'nin uygulanma şekli — `HomePage.jsx`'teki
`weak-topic-reminder` kartındaki her `<Link to={w.route}>` doğrudan ilgili
dersin route'una gider (bkz. §2 Aşama B, commit `4ab2388`). Ek iş yok.

### 6.4 Yeni fikir değerlendirmesi — Homepage Hero & Onboarding Turu

Kod okunarak denetlendi (varsayımla değil): `HomePage.jsx`'teki üst header
(`t('header.title')` → "🧭 QA Learning Platform", `t('header.subtitle')` →
"Python, SQL, otomasyon araçları ve DevOps konularını QA odaklı yollarla
öğren") küçük, sticky bir navbar'dır — araç listesi anlatır, bir KİMLİK/
hedef vaadi vermez ("Sıfırdan Otomasyon Test Uzmanı Ol" tarzı). Ayrıca yeni
ziyaretçi için ZATEN bir CTA banner'ı var (`mentorMapState.state` default
dalı: "👋 Yeni misin? Kişisel QA Kariyer Haritanı Oluştur", 4 soru/~1 dk,
"Başla" butonu — §1.1 hero fikrinin bir kısmını zaten karşılıyor) AMA bu
banner `TrendingSkillsWidget` ve `MembershipPromo`'nun ALTINDA render
ediliyor — yani ilk kez gelen bir ziyaretçi "bu site ne işe yarar"dan önce
trend widget'ı ve üyelik promosunu görüyor. Onboarding turu tarafında ise
gerçek bir boşluk doğrulandı: kod tabanında `tour`/`onboarding`/"hoş geldin"
adında hiçbir bileşen YOK (grep sonucu — eşleşen 49 dosya sadece mülakat
içeriğinde "onboarding" kelimesinin HR/QA terimi olarak geçtiği veri
dosyalarıydı, gerçek bir tur bileşeni değil).

**Değerlendirme — kısmen kabul, yumuşatılmış:**
- ❌ **"Büyük yeni hero bölümü" olduğu gibi RED.** `learning-os-redesign-plan.md`
  §3.2 zaten bunu reddetmişti: "Görsel dilin baştan tasarımı → RED... redesign
  değil, yeni yüzeyler aynı dille eklenir." Yeni, büyük bir hero bloğu
  eklemek bu kalıcı kararla çelişir ve mevcut header/banner hiyerarşisini
  bozma riski taşır.
- ✅ **Yumuşatılmış karşılık — mevcut yüzeylerin YENİDEN SIRALANMASI + metin
  cilası:** Yeni component yazılmadan, sadece (1) anonim/yeni ziyaretçi için
  "👋 Yeni misin?" banner'ı `TrendingSkillsWidget`/`MembershipPromo`'nun
  ÜSTÜNE taşımak, (2) `header.subtitle` metnine araç listesi yanında bir
  kimlik/hedef cümlesi eklemek (örn. "...QA odaklı yollarla öğren, sıfırdan
  otomasyon test mühendisliğine ilerle") — CLAUDE.md'nin "mevcut tasarıma
  sadık kal" ilkesiyle uyumlu, düşük riskli bir değişiklik.
- ✅ **Onboarding turu — kabul, yeni ama küçük kapsamlı:** 3-4 adımlık,
  ENGELLEMEYEN (modal değil, dismissible tooltip/spotlight dizisi — Bölüm
  20'deki "büyüleyici ama pürüzsüz" ilkesiyle uyumlu, akışı KESMEZ) bir tur:
  "Bu site ne işe yarar? → Nasıl ilerlerim? (kariyer haritası) → İlk ne
  yapmalıyım? (Devam et / Yeni misin banner'ı)". `learnqa_onboarding_seen`
  localStorage anahtarı (local-first, üyelik gerekmez, CLAUDE.md §5/§7 ile
  uyumlu) ile bir kez gösterilir. Yeni dış kütüphane YOK (CLAUDE.md §8) —
  saf CSS/inline SVG spotlight + `position: fixed` tooltip kartları.

**Aşama E olarak plana eklendi** (henüz kodlanmadı): `src/lib/onboarding.js`
(yeni, `hasSeenOnboarding()`/`markOnboardingSeen()`) + `src/components/
OnboardingTour.jsx` (yeni) + `HomePage.jsx`'te banner sıralaması değişikliği
+ `src/locales/*.json`'da `header.subtitle` cilası.
