import { uuidv4 } from '@firebase/util';
import {
	Firestore,
	doc,
	setDoc,
	deleteDoc,
	collection,
	getDocs,
	where,
	query,
	limit,
  orderBy
} from 'firebase/firestore';
import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

export type PostDTO = {
	description: string;
	image: File | string;
	likes: number;
	pending: boolean;
	school: string;
	created: Date;
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
	post: PostDTO
): Promise<ReturnResult> {
	console.log(post.description);
	if (!Schools.includes(post.school)) {
		return new ReturnResult(false, 'Invalid school name');
	}
	const pendingPath = uploadPath((post.image as File).name);

	const firestoreResult = await uploadToFirestore(db, post, pendingPath);
	if (!firestoreResult.success) return logAndReturnResult(firestoreResult.message);

	const storageResult = await uploadToStorage(storage, post, pendingPath);
	if (!storageResult.success) {
		removeHangingPost(db, pendingPath);
		return logAndReturnResult(storageResult.message);
	}

	return new ReturnResult(true, 'Successful upload');
}

async function uploadToFirestore(
	db: Firestore,
	post: PostDTO,
	uploadPath: string
): Promise<ReturnResult> {
	try {
		await setDoc(doc(db, 'posts', uploadPath.split('/').pop()), {
			description: post.description,
			image: uploadPath,
			likes: 0,
			school: post.school,
			pending: true,
			created: Date.now()
		});

		return new ReturnResult(true, 'File upload successful');
	} catch (error) {
		return new ReturnResult(false, (error as Error).message);
	}
}

async function uploadToStorage(storage: FirebaseStorage, post: PostDTO, pendingPath: string) {
	const pendingRef = ref(storage, pendingPath);
	try {
		const result = await uploadBytes(pendingRef, post.image as File);
		return new ReturnResult(result ? true : false, 'Image upload was successful');
	} catch (error) {
		console.error(error);
		return new ReturnResult(false, (error as Error).message);
	}
}

async function removeHangingPost(db: Firestore, path: string) {
	let postId = path.split('/').pop();
	try {
		let post = doc(db, 'posts', postId);
		await deleteDoc(post);
	} catch (error) {
		console.error(`Could not delete ${postId}`);
	}
}

export async function fetchTopPosts(db: Firestore, storage: FirebaseStorage): Promise<PostDTO[]> {
	let posts = collection(db, 'posts');
	// add index for orderby later
	let q = query(posts, where('pending', '==', false), limit(9));
	console.info('Make query for docs');
	let result = await getDocs(q);
	console.log(result);
	let mapped = result.docs.map(d => d.data() as PostDTO);
	console.log(mapped);
	mapped = await getPostImages(storage, mapped);
	return mapped;
}

async function getPostImages(storage: FirebaseStorage, posts: PostDTO[]) {
	for (const post of posts) {
		try {
			let img = ref(storage, post.image as string);
			post.image = await getDownloadURL(img);
		} catch (error) {
			console.error(`Error on ${post.image}`, error);
		}
	}

	return posts;
}

function uploadPath(imgName: string): string {
	return `/pendingUploads/${uuidv4()}}`;
}

function logAndReturnResult(msg: string): ReturnResult {
	console.error(msg);
	return new ReturnResult(false, msg);
}
