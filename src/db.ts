import firebase from "firebase/app";
import { uuidv4 } from "@firebase/util";
import { FirebaseStorage, getStorage, ref, uploadBytes } from "firebase/storage";

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
  school: string
  image: File
}

export async function uploadFile(storage: FirebaseStorage, post: Post): Promise<boolean> {
  console.log(post.image.name);
  const pendingPath = `/pendingUploads/${uuidv4()}-${post.image.name.split(".").at(0)}`;
  const pendingRef = ref(storage, pendingPath);
  try {
    const result = await uploadBytes(pendingRef, post.image);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
