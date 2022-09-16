<script lang="ts">
	import type { FirebaseApp } from 'firebase/app';
	import type { Firestore } from 'firebase/firestore';
	import type { FirebaseStorage } from 'firebase/storage';
	import { onMount } from 'svelte';
	import { getFirebaseApp, getDb, getFirebaseStorage } from '../../init';
	import { PostDTO, fetchTopPosts } from '../../db';
	import Post from '../components/Post.svelte';

	let app: FirebaseApp;
	let storage: FirebaseStorage;
	let db: Firestore;
	let posts: PostDTO[] = [];

	onMount(async () => {
		app = getFirebaseApp();
		storage = getFirebaseStorage();
		db = getDb();
		posts = await fetchTopPosts(db, storage);
	});
</script>

<div class="container">
	{#each posts as post}
		<Post data = {post} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
