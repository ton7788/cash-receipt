// ตั้งชื่อ Cache เพื่อใช้ระบุเวอร์ชันแอป
const CACHE_NAME = 'cash-receipt-v1.0.1';

// รายการไฟล์ที่แอปจะโหลดไปเก็บไว้ในเครื่องเพื่อใช้ตอนไม่มีเน็ต
const assets = [
  './index.html',
  './manifest.json',
  './icon.png', // ตรวจสอบว่าชื่อไฟล์ไอคอนของคุณตรงกับชื่อนี้
  'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
];

// 1. ขั้นตอนการติดตั้ง (Install): โหลดไฟล์ลงเครื่อง
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// 2. ขั้นตอนการเปลี่ยนเวอร์ชัน (Activate): ลบ Cache เก่าทิ้งเมื่อมีการอัปเดต
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. ขั้นตอนการเรียกใช้ (Fetch): เมื่อไม่มีเน็ต ให้ดึงไฟล์จากเครื่องมาแสดง
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );

});
