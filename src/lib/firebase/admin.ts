import * as admin from 'firebase-admin';

/**
 * Firebase Admin SDK — server-side only.
 * Never import this in client components.
 */

function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
    );
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

// Lazy proxies — initialization is deferred until first property access at runtime,
// so importing this module during Next.js build does not throw when env vars are absent.
export const adminDb = new Proxy({} as ReturnType<typeof admin.firestore>, {
  get(_, prop: string | symbol) {
    return (admin.firestore(getAdminApp()) as any)[prop as string];
  },
});

export const adminAuth = new Proxy({} as ReturnType<typeof admin.auth>, {
  get(_, prop: string | symbol) {
    return (admin.auth(getAdminApp()) as any)[prop as string];
  },
});

export const adminStorage = new Proxy({} as ReturnType<typeof admin.storage>, {
  get(_, prop: string | symbol) {
    return (admin.storage(getAdminApp()) as any)[prop as string];
  },
});

export default { adminDb, adminAuth, adminStorage };
