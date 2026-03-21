// チャイム用Service Worker
// PWAとして動作させ、バックグラウンドでもタイマーを維持する

const CACHE_NAME = 'chime-v1';

// インストール時
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// アクティベート時
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// フェッチ（オフライン対応は最小限）
self.addEventListener('fetch', (event) => {
  // ネットワーク優先、失敗したらキャッシュ
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
