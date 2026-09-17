const CACHE_NAME = 'masjidku-v3'
const ASSETS = [
  '/', '/index.html', '/manifest.json',
  '/icon-192.png', '/icon-512.png',
  '/icon-192-maskable.png', '/icon-512-maskable.png',
  '/apple-touch-icon.png', '/favicon-32.png',
  '/splash-bg.jpg', '/login-hero-bg.jpg',
]

const OFFLINE_FALLBACK = `<!doctype html><html lang="id"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>MasjidKu — Offline</title>
<style>
  body{font-family:system-ui,sans-serif;background:#FAFAF7;color:#1B2420;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    height:100vh;margin:0;text-align:center;padding:24px;}
  h1{color:#0A3D2A;font-size:20px;margin-bottom:8px;}
  p{color:rgba(27,36,32,0.6);font-size:14px;max-width:280px;}
  button{margin-top:16px;background:#0F5C3F;color:#fff;border:none;border-radius:12px;
    padding:12px 24px;font-weight:700;font-size:14px;}
</style></head><body>
  <h1>Tidak ada koneksi internet</h1>
  <p>MasjidKu butuh koneksi untuk memuat halaman ini. Konten yang pernah dibuka sebelumnya tetap bisa diakses offline.</p>
  <button onclick="location.reload()">Coba Lagi</button>
</body></html>`

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        ASSETS.map((url) => cache.add(url).catch(() => null)) // jangan gagal total kalau satu aset hilang
      )
    )
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // simpan salinan segar untuk aset same-origin ke cache (selain API pihak ketiga)
        if (event.request.url.startsWith(self.location.origin)) {
          const copy = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
        }
        return res
      })
      .catch(async () => {
        const cached = await caches.match(event.request)
        if (cached) return cached
        if (event.request.mode === 'navigate') {
          return new Response(OFFLINE_FALLBACK, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } })
        }
        return Response.error()
      })
  )
})
