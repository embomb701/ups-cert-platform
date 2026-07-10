import { adminDb } from '@/lib/firebase/admin';
import { accessKeysForModule } from '@/data/index';
import type { TrainingModule } from '@/data/modules';

// True if the user holds a granted examAccess doc for any course that
// includes this module (shared modules 1-10 accept either course).
export async function hasTrainingAccess(uid: string, mod: TrainingModule): Promise<boolean> {
  const keys = accessKeysForModule(mod);
  const docs = await Promise.all(
    keys.map((k) => adminDb.collection('users').doc(uid).collection('examAccess').doc(k).get())
  );
  return docs.some((d) => d.exists && d.data()?.granted === true);
}
