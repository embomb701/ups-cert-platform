'use client';

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getIdToken as firebaseGetIdToken,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from './client';
import { hashIp } from '@/lib/utils/ipHash';

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Ensure user document exists in Firestore — non-blocking
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName ?? '',
        email: user.email ?? '',
        createdAt: serverTimestamp(),
        role: 'user',
      });
    }
  } catch {
    // Firestore write failed — login still succeeds
  }

  // Return the full User so callers can call getIdToken() to set the server cookie
  return user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function getIdToken(): Promise<string | null> {
  if (!auth.currentUser) return null;
  return firebaseGetIdToken(auth.currentUser);
}

export { onAuthStateChanged, auth };
export type { User };
