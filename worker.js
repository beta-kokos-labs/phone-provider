// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

// service-worker.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.message
  });
});
