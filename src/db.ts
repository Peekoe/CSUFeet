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

export async function uploadToFirestore(
	db: Firestore,
	post: Post,
	uploadPath: string
): Promise<boolean> {
	// Add a new document in collection 'posts'
	try {
		await setDoc(doc(db, 'posts'), {
			description: 'A description',
			image: uploadPath,
			likes: 0,
			school: post.school,
			pending: true
		});

		return true;
	} catch (error) {
		return false;
	}
}

export class ReturnResult {
	public success: boolean;
	public message: string;

	constructor(success: boolean, message: string) {
		this.success = success;
		this.message = message;
	}
}

export async function uploadPost(storage: FirebaseStorage, post: Post): Promise<ReturnResult> {
	console.log(post.image.name);
	if (!Schools.includes(post.school)) {
		return new ReturnResult(false, 'Invalid school name');
	}

	const pendingPath = uploadPath(post.image.name);
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
