# MasjidKu — Ruang Digital Masjid Untuk Umat

Phase 1 — UI Shell. HTML/CSS/JS murni (CSS & JS inline di index.html), tanpa build tool.

## Struktur (flat, sesuai pola repo lain)
```
index.html
manifest.json
sw.js
icon-192.png
icon-512.png
icon-192-maskable.png
icon-512-maskable.png
apple-touch-icon.png
favicon-32.png
README.md
```

## Status
Splash, Login (email/HP), navigasi 5 tab (Beranda, Al-Qur'an, Masjid, Doa, Akun).
Data masih placeholder. Belum terhubung Supabase.

## Jalankan lokal
Buka `index.html` langsung di browser, atau `npx serve .`

## Setup Supabase (Phase 2)
Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di bagian atas script dalam `index.html`.

## Deploy
Push semua file ini ke repo GitHub `masjidku`, lalu import ke Vercel
(framework preset "Other", tanpa build command, root directory langsung).

## Aturan Produk (jangan dilanggar)
- Bottom navigation wajib tepat 5 menu.
- Tidak ada fitur/tabel/statistik "Jamaah".
- Data pengurus masjid bersifat optional.
- Service role key Supabase tidak boleh masuk ke file ini — hanya anon key.
