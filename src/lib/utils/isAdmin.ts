import { adminDb } from '@/lib/firebase/admin';

export async function checkIsAdmin(uid: string, email: string): Promise<boolean> {
  // Check env var (comma-separated list of admin emails)
  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (adminEmails.includes(email.toLowerCase())) return true;

  // Fallback: check Firestore profile for isAdmin flag
  try {
    const doc = await adminDb.collection('users').doc(uid).get();
    if (doc.exists && doc.data()?.isAdmin === true) return true;
  } catch {}

  return false;
}
