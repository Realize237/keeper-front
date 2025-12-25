import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { env } from '../utils/env';

export const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

export const FIREBASE_VAPID_KEY = env.FIREBASE_VAPID_KEY;

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const getFirebaseToken = async (): Promise<string | null> => {
  try {
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );

    await navigator.serviceWorker.ready;

    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey: FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    return token || null;
  } catch {
    return null;
  }
};

onMessage(messaging, (payload) => {
  const { title, body, icon } = payload.data ?? {};

  if (title) {
    new Notification(title, {
      body,
      icon,
    });
  }
});
