importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

fetch('/firebase-config.json')
  .then((res) => res.json())
  .then(({ firebaseConfig }) => {
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      const { title, body, icon } = payload.data || {};

      if (title) {
        self.registration.showNotification(title, {
          body,
          icon,
        });
      }
    });
  })
  .catch((err) => {
    console.error('[SW] Failed to load firebase config', err);
  });
