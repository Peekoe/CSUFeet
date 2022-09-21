import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps} from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './env';

let app: FirebaseApp = null;
let db: Firestore = null;
let storage: FirebaseStorage = null;

const browser = typeof window !== 'undefined';

export function getFirebaseApp(): FirebaseApp {
  if (app) {
    return app;
  }

  if (getApps().length) {
    app = getApps()[0];
    return app;
  }

  app = initializeApp(firebaseConfig);
  console.log(`${firebaseConfig.projectId} initialized on ${browser ? 'client' : 'server'}`);

  if (browser) {
    const db = getFirestore();
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code == 'failed-precondition') {
        console.warn(
          'When multiple tabs open, Firestore persistence can only be enabled in one tab at a time.'
        );
      } else if (err.code == 'unimplemented') {
        console.warn(
          'The current browser does not support all of the features required to enable Firestore persistence.'
        );
      }
    });
  }
  return app;
}

export function getDb(): Firestore {
  if (db) {
    return db;
  }

  db = getFirestore(getFirebaseApp());
  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (storage) {
    return storage;
  }

  storage = getStorage(getFirebaseApp());
  return storage;
}
