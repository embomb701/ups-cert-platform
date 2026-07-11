import { adminDb } from '@/lib/firebase/admin';
import { accessKeysForModule, prevModuleCandidates } from '@/data/index';
import type { TrainingModule } from '@/data/modules';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

// Which of the module's eligible course keys the user actually holds.
export async function getGrantedCourseKeys(uid: string, mod: TrainingModule): Promise<string[]> {
  const keys = accessKeysForModule(mod);
  const docs = await Promise.all(
    keys.map((k) => adminDb.collection('users').doc(uid).collection('examAccess').doc(k).get())
  );
  return keys.filter((_, i) => docs[i].exists && docs[i].data()?.granted === true);
}

// True if the user holds a granted examAccess doc for any course that
// includes this module (shared modules accept any enrolling course).
export async function hasTrainingAccess(uid: string, mod: TrainingModule): Promise<boolean> {
  return (await getGrantedCourseKeys(uid, mod)).length > 0;
}

export interface UnlockState {
  locked: boolean;
  unlockDate: Date | null; // set when locked purely by the 3-day wait
}

// Course-sequence-aware 3-day unlock rule. A module is unlocked when, in ANY
// of the user's enrolled courses containing it, the preceding module was
// completed at least 3 days ago. Shared modules (foundation, refrigeration
// core) therefore unlock along whichever course the student is progressing.
export async function moduleUnlockState(
  uid: string,
  mod: TrainingModule,
  grantedKeys: string[],
): Promise<UnlockState> {
  const prevs = prevModuleCandidates(mod, grantedKeys);
  if (prevs.length === 0) return { locked: false, unlockDate: null };

  let bestUnlockDate: Date | null = null;
  for (const prev of prevs) {
    const snap = await adminDb
      .collection('users').doc(uid)
      .collection('trainingProgress').doc(prev.id)
      .get();
    const data = snap.data();
    if (!data?.completedAt || !data?.passed) continue;
    const completedAt = data.completedAt.toDate ? data.completedAt.toDate() : new Date(data.completedAt);
    const unlockAt = new Date(completedAt.getTime() + THREE_DAYS_MS);
    if (Date.now() >= unlockAt.getTime()) return { locked: false, unlockDate: null };
    if (!bestUnlockDate || unlockAt < bestUnlockDate) bestUnlockDate = unlockAt;
  }
  return { locked: true, unlockDate: bestUnlockDate };
}
