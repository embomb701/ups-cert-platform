'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import type { UserProfile } from '@/types';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isProctor: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isProctor: false,
});

function setAuthCookie(token: string) {
  document.cookie = `firebase-token=${token}; path=/; max-age=3500; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = 'firebase-token=; path=/; max-age=0; SameSite=Lax';
}

export async function refreshAuthCookie(): Promise<string | null> {
  if (!auth.currentUser) return null;
  try {
    const token = await auth.currentUser.getIdToken(true);
    setAuthCookie(token);
    return token;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 4000);

    if (!auth) {
      clearTimeout(timeout);
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      clearTimeout(timeout);

      if (firebaseUser) {
        // Set the cookie BEFORE updating state so that any navigation
        // triggered by state change finds the cookie already in place.
        try {
          const token = await firebaseUser.getIdToken();
          setAuthCookie(token);
        } catch {
          // Token fetch failed — cookie stays stale; server will redirect to login
        }

        setUser(firebaseUser);
        setLoading(false);

        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (snap.exists()) setProfile(snap.data() as UserProfile);
        } catch {
          // Firestore unavailable — profile stays null
        }
      } else {
        clearAuthCookie();
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    // Refresh the token cookie every 50 minutes (tokens expire after 60 min)
    const refreshInterval = setInterval(async () => {
      if (auth.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken(true);
          setAuthCookie(token);
        } catch {/* ignore */}
      }
    }, 50 * 60 * 1000);

    return () => {
      unsub();
      clearTimeout(timeout);
      clearInterval(refreshInterval);
    };
  }, []);

  const isAdmin = profile?.role === 'admin';
  const isProctor = profile?.role === 'proctor' || profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, isProctor }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
