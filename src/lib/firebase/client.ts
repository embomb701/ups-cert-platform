import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Defer initialization to avoid Firebase API key validation during Next.js SSR prerendering.
function getClientApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

// Lazy proxies — Firebase is only initialized when properties are first accessed
// in the browser, not during server-side rendering.
export const auth = new Proxy({} as Auth, {
  get(_, prop: string | symbol) {
    return (getAuth(getClientApp()) as any)[prop as string];
  },
});

export const db = new Proxy({} as Firestore, {
  get(_, prop: string | symbol) {
    return (getFirestore(getClientApp()) as any)[prop as string];
  },
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(_, prop: string | symbol) {
    return (getStorage(getClientApp()) as any)[prop as string];
  },
});

export const googleProvider = new GoogleAuthProvider();

export default { auth, db, storage };
