/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'v2'; // Incrementar a versão conforme necessário

// self.addEventListener("install", (event) => {
// //   self.skipWaiting(); // Força o Service Worker a ativar imediatamente após a instalação
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         "/", // Root
//         "/static/js/main.chunk.js", 
//         "/static/js/0.chunk.js", 
//         "/static/js/bundle.js", 
//         "/index.html",
//         "/manifest.json",
//         "/assets/images/logo_angra.png",
//         "/assets/images/logo_192x192.jpg", 
//         "/assets/images/logo_512x512.jpg",
//       ]);
//     })
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//       caches.keys().then(cacheNames => {
//           return Promise.all(
//               cacheNames.map(cacheName => {
//                   if (cacheName !== CACHE_NAME) {
//                       return caches.delete(cacheName);
//                   }
//               })
//           );
//       }).then(() => {
//           return self.clients.claim(); // Faz com que o Service Worker ativo controle todas as páginas abertas
//       })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return (
//         response ||
//         fetch(event.request).then((fetchResponse) => {
//           return caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, fetchResponse.clone());
//             return fetchResponse;
//           });
//         })
//       );
//     })
//   );
// });