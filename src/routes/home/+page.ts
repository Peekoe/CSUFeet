import { fetchTopPosts } from '$src/db';
import { getFirebaseApp, getDb, getFirebaseStorage } from '$src/init';

export async function load() {
  const db = getDb();
  const storage = getFirebaseStorage();
  return { posts: await fetchTopPosts(db, storage) };
}
