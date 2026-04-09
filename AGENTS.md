# Agents.md

## Proje Hakkında
Bu bir Astro tabanlı statik bilgi sitesidir. GitHub Pages'de host edilir. Decap CMS ile admin paneli vardır.

## Geliştirme
- `npm install` — bağımlılıkları yükle
- `npm run dev` — geliştirme sunucusu (localhost:4321)
- `npm run cms` — Decap CMS local backend proxy
- `npm run build` — production build
- `npm run preview` — build sonrası önizleme

## Dizin Yapısı
- `src/content/` — Markdown içerikler (CMS tarafından yönetilir)
- `src/components/` — Astro bileşenleri
- `src/pages/` — Sayfa route'ları
- `public/admin/` — Decap CMS admin paneli
- `src/data/` — Site ayarları ve admin tarafından düzenlenen JSON dosyaları

## Test
- Build: `npm run build` komutunun hatasız tamamlandığını doğrula
- Type check: `npx astro check`
- Lint: Eğer eslint varsa `npm run lint`

## Önemli Notlar
- Tüm içerikler Türkçedir
- SEO meta tag'leri her sayfada zorunludur
- Image'lar Astro `<Image />` componenti ile optimize edilmelidir
- Dark mode class stratejisiyle çalışır
