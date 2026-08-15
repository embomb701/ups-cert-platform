'use client';

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getIdToken as firebaseGetIdToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from './client';
import { getStoredReferralCode, clearReferralCode } from '@/lib/utils/referral';

// Ensure user document exists in Firestore — non-blocking; login still succeeds if it fails.
// Returns true if a new doc was created (i.e. this is a first-time signup).
async function ensureUserDoc(user: User): Promise<boolean> {
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
      return true;
    }
    return false;
  } catch {
    // Firestore write failed — login still succeeds
    return false;
  }
}

// Credits whoever referred this new user, if a ?ref= code was captured earlier.
// Best-effort — never blocks or fails the signup flow.
async function trackReferral(user: User): Promise<void> {
  const code = getStoredReferralCode();
  if (!code) return;
  try {
    const token = await user.getIdToken();
    await fetch('/api/referral/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ refCode: code }),
    });
  } catch {
    // Referral credit failed — not worth surfacing to the user
  } finally {
    clearReferralCode();
  }
}

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const isNewUser = await ensureUserDoc(result.user);
  if (isNewUser) await trackReferral(result.user);
  // Return the full User so callers can call getIdToken() to set the server cookie
  return result.user;
}

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (name.trim()) {
    await updateProfile(result.user, { displayName: name.trim() });
  }
  const isNewUser = await ensureUserDoc(result.user);
  if (isNewUser) await trackReferral(result.user);
  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const isNewUser = await ensureUserDoc(result.user);
  if (isNewUser) await trackReferral(result.user);
  return result.user;
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// Map Firebase auth error codes to friendly messages
export function authErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please try again.';
    case 'auth/invalid-email':
      return 'That email address is not valid.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in window was closed before finishing. Please try again.';
    case 'auth/operation-not-allowed':
      return 'Email sign-in is not enabled yet. Please use Google sign-in or contact support.';
    default:
      return (err as { message?: string })?.message ?? 'Sign-in failed. Please try again.';
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
  // Clear cached pages so a shared/public device doesn't keep serving
  // this account's offline-cached content to the next person who logs in.
  if (typeof navigator !== 'undefined' && navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage('CLEAR_RUNTIME_CACHE');
  }
}

export async function getIdToken(): Promise<string | null> {
  if (!auth.currentUser) return null;
  return firebaseGetIdToken(auth.currentUser);
}

export { onAuthStateChanged, auth };
export type { User };
