#!/usr/bin/env ts-node
/**
 * import-questions.ts
 * Imports validated question JSON into Firebase Firestore questionBank collection.
 *
 * Prerequisites:
 *   1. Set GOOGLE_APPLICATION_CREDENTIALS to your Firebase service account JSON path
 *      OR set FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local
 *   2. Run validate-questions first
 *
 * Usage:
 *   npm run import-questions -- --file data/questions/jr-fsc-sample.json
 *   npm run import-questions -- --file data/questions/fsc-sample.json --dry-run
 *   npm run import-questions -- --file data/questions/jr-fsc-sample.json --overwrite
 */

import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Load env from .env.local if not already set
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch {}

function initAdmin(): void {
  if (admin.apps.length > 0) return;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      'Missing Firebase credentials. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local'
    );
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}

async function importQuestions(
  filePath: string,
  dryRun: boolean,
  overwrite: boolean
): Promise<void> {
  console.log(`\nImporting: ${filePath}`);
  if (dryRun) console.log('  DRY RUN — no writes will be performed');

  const raw = fs.readFileSync(filePath, 'utf8');
  const questions = JSON.parse(raw) as Record<string, unknown>[];

  const db = admin.firestore();
  const collection = db.collection('questionBank');

  let created = 0;
  let skipped = 0;
  let updated = 0;
  let errors = 0;

  // Process in batches of 500 (Firestore limit)
  const batchSize = 400;
  for (let i = 0; i < questions.length; i += batchSize) {
    const chunk = questions.slice(i, i + batchSize);
    const batch = db.batch();

    for (const q of chunk) {
      const id = q.id as string;
      try {
        if (!dryRun) {
          const docRef = collection.doc(id);
          const snap = await docRef.get();

          if (snap.exists && !overwrite) {
            skipped++;
            continue;
          }

          batch.set(
            docRef,
            {
              ...q,
              createdAt: snap.exists ? snap.data()?.createdAt : admin.firestore.FieldValue.serverTimestamp(),
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: overwrite }
          );

          if (snap.exists) updated++;
          else created++;
        } else {
          console.log(`  [DRY RUN] Would write: ${id}`);
          created++;
        }
      } catch (e) {
        console.error(`  ERROR writing ${id}: ${e}`);
        errors++;
      }
    }

    if (!dryRun) {
      await batch.commit();
    }
  }

  console.log(`\nImport complete:`);
  console.log(`  Created:  ${created}`);
  console.log(`  Updated:  ${updated}`);
  console.log(`  Skipped:  ${skipped} (use --overwrite to update existing)`);
  console.log(`  Errors:   ${errors}`);
}

// Parse args
const args = process.argv.slice(2);
const fileArg = args.indexOf('--file');
const dryRun = args.includes('--dry-run');
const overwrite = args.includes('--overwrite');

if (fileArg === -1 || !args[fileArg + 1]) {
  console.error('Usage: npm run import-questions -- --file <path> [--dry-run] [--overwrite]');
  process.exit(1);
}

const filePath = path.resolve(args[fileArg + 1]);

initAdmin();
importQuestions(filePath, dryRun, overwrite)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  });
