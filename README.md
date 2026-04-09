# Atlas Bilgi

Astro 6, Tailwind CSS v4 ve Decap CMS ile hazırlanmış modern bir bilgi/info sitesi. Proje statik çıktı üretir, GitHub Pages üzerinde host edilir ve içerik düzenleme için `/admin/` altında çalışan bir Decap CMS paneli içerir.

![Ana sayfa placeholder](./public/images/uploads/site-preview.svg)

## Özellikler

- Astro tabanlı yüksek performanslı statik mimari
- Tailwind CSS v4 ile responsive, dark mode destekli modern tasarım
- Markdown + frontmatter tabanlı içerik yönetimi
- Decap CMS admin paneli
- GitHub Pages için hazır GitHub Actions deploy akışı
- RSS feed, sitemap, canonical URL, Open Graph ve JSON-LD desteği
- Pagefind ile build-time statik arama

## Kurulum

```bash
git clone https://github.com/KULLANICI/REPO.git
cd REPO
npm install
npm run dev
```

Geliştirme sunucusu varsayılan olarak `http://localhost:4321` adresinde açılır.

Admin panelini lokalde gerçekten düzenleme yapacak şekilde kullanmak için ikinci terminalde ayrıca şunu çalıştırın:

```bash
npm run cms
```

Sonra:

- Site: `http://localhost:4321`
- Admin: `http://localhost:4321/admin/`

## Kullanılabilir Komutlar

```bash
npm run dev
npm run cms
npm run build
npm run preview
npm run check
```

## Proje Yapısı

```text
.
├── .github/workflows/deploy.yml
├── public/
│   ├── admin/
│   ├── favicon.svg
│   └── images/uploads/
├── src/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── AGENTS.md
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

## Decap CMS Kullanımı

Admin paneli `public/admin/index.html` ile yüklenir ve üretimde `/admin/` altında çalışır.

### Yapmanız gerekenler

1. `public/admin/config.yml` içindeki repo değeri şu an `cherynoska/info-site` olarak ayarlı. Repo adınız farklıysa bunu güncelleyin.
2. Gerekirse `branch` ve `base_url` değerlerini kendi OAuth akışınıza göre güncelleyin.
3. Lokalde test etmek için iki terminal kullanın:
   - Terminal 1: `npm run dev`
   - Terminal 2: `npm run cms`
4. İçerik koleksiyonları:
   - `src/content/articles`
   - `src/content/pages`
   - `src/content/team`
   - `src/content/gallery`
   - `src/data/settings.json`
   - `src/data/homepage.json`
   - `src/data/page-settings.json`

### OAuth seçenekleri

- En kolay yöntem: Netlify Identity + Git Gateway
- Alternatif: `https://decap-oauth.netlify.app`
- Lokal test: `npm run cms`

## GitHub Pages Deployment

Bu repo, Astro'nun resmi GitHub Pages akışını kullanır:

- `withastro/action@v6`
- `actions/deploy-pages@v5`
- Node 22.12.0+

### GitHub tarafında yapılacaklar

1. Repository Settings -> Pages bölümüne gidin.
2. Source olarak `GitHub Actions` seçin.
3. `main` branch'e push yapın.

Workflow, üretim build sırasında şu environment değerlerini otomatik oluşturur:

- `SITE_URL`: `https://<github-owner>.github.io`
- `SITE_BASE`: proje repo'su için `/<repo-adi>`

Eğer repo adı `username.github.io` ise workflow `SITE_BASE=/` kullanır.

### Custom domain

Özel alan adı kullanacaksanız:

1. `public/CNAME` dosyası oluşturun.
2. Dosyanın içine yalnızca domain adınızı yazın.
3. Gerekirse workflow env veya Astro config için `SITE_URL` değerini özel domain ile güncelleyin.

## İçerik ve Medya

- CMS upload klasörü: `public/images/uploads`
- Site ayarları: `src/data/settings.json`
- Ana sayfa blokları: `src/data/homepage.json`
- Sayfa başlıkları ve ek metinler: `src/data/page-settings.json`
- Makale route'ları: `/makaleler/`
- Admin paneli: `/admin/`
- RSS: `/rss.xml`

Not: `public/` altındaki CMS görselleri Astro tarafından optimize edilmez. Buna karşılık layout, yükseklik-genişlik oranı ve erişilebilirlik korunur.

## Geliştirme Notları

- Dark mode class stratejisiyle çalışır.
- Site içi arama, `npm run build` sırasında Pagefind indeksini üretir.
- GitHub Pages alt yol senaryoları için linkler `BASE_URL` uyumlu yazılmıştır.
- `robots.txt` dinamik endpoint olarak üretilir.

## Katkıda Bulunma

1. Bir branch oluşturun.
2. Değişikliklerinizi yapın.
3. `npm run build` ve `npm run check` komutlarını çalıştırın.
4. Pull request açın.

## Lisans

Bu proje MIT lisansı ile sunulmaktadır.
