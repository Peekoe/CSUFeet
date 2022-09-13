import { uuidv4 } from '@firebase/util';
import { Firestore, doc, setDoc } from 'firebase/firestore';
import { FirebaseStorage, getStorage, ref, uploadBytes } from 'firebase/storage';

export let Schools = [
  'Bakersfield',
  'Channel Islands',
  'Chico',
  'Dominguez Hills',
  'East Bay',
  'Fresno',
  'Fullerton',
  'Humboldt',
  'Long Beach',
  'Los Angeles',
  '​Maritime Academy',
  'Monterey Bay',
  'Northridge',
  'Pomona',
  'Sacramento',
  'San Bernardino',
  'San Diego',
  'San Francisco',
  'San José',
  'San Luis Obispo',
  'San Marcos',
  'Sonoma',
  'Stanislaus'
];

export type Post = {
  description: string;
  image: File;
  likes: number;
  pending: boolean;
  school: string;
};

export class ReturnResult {
  public success: boolean;
  public message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

export async function uploadPost(
  storage: FirebaseStorage,
  db: Firestore,
  post: Post
): Promise<ReturnResult> {
  console.log(post.description);
  if (!Schools.includes(post.school)) {
    return new ReturnResult(false, 'Invalid school name');
  }
  const pendingPath = uploadPath(post.image.name);

  const firestoreResult = await uploadToFirestore(db, post, pendingPath);
  if (!firestoreResult.success) return logAndReturnResult(firestoreResult.message);

  const storageResult = await uploadToStorage(storage, post, pendingPath);
  if (!storageResult.success) return logAndReturnResult(storageResult.message);

  return new ReturnResult(true, 'Successful upload');
}

async function uploadToFirestore(
  db: Firestore,
  post: Post,
  uploadPath: string
): Promise<ReturnResult> {
  try {
    await setDoc(doc(db, 'posts', uploadPath.split('/').pop()), {
      description: post.description,
      image: uploadPath,
      likes: 0,
      school: post.school,
      pending: true
    });

    return new ReturnResult(true, 'File upload successful');
  } catch (error) {
    return new ReturnResult(false, (error as Error).message);
  }
}

async function uploadToStorage(storage: FirebaseStorage, post: Post, pendingPath: string) {
  const pendingRef = ref(storage, pendingPath);
  try {
    const result = await uploadBytes(pendingRef, post.image);
    return new ReturnResult(result ? true : false, 'Image upload was successful');
  } catch (error) {
    console.error(error);
    return new ReturnResult(false, (error as Error).message);
  }
}

function uploadPath(imgName: string): string {
  return `/pendingUploads/${uuidv4()}-${imgName.split('.').at(0)}`;
}

function logAndReturnResult(msg: string): ReturnResult {
  console.error(msg);
  return new ReturnResult(false, msg);
}
