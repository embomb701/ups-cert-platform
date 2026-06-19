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

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Ensure user document exists in Firestore
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
