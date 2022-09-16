<script lang="ts">
	import type { FirebaseApp } from 'firebase/app';
	import type { FirebaseStorage } from 'firebase/storage';
	import type { Firestore } from 'firebase/firestore';
	import type { PostDTO } from '../../db';
	import { uploadPost, Schools } from '../../db';
	import { onMount } from 'svelte';
	import { getFirebaseApp, getDb, getFirebaseStorage } from '../../init';

	let app: FirebaseApp;
	let storage: FirebaseStorage;
	let db: Firestore;
	let success = false;
	let errorMsg: string = '';

	let avatar: string | null | undefined;
	let fileinput: HTMLInputElement;
	let description: string;
	let school: string;

	onMount(async () => {
		app = getFirebaseApp();
		storage = getFirebaseStorage();
		db = getDb();
	});

	async function uploadToStore() {
		let post: PostDTO = {
			description: description,
			image: fileinput.files.item(0),
			likes: 0,
			pending: true,
			school: school
		};
		let result = await uploadPost(storage, db, post);
		success = result.success;
		errorMsg = result.message;
	}

	function onFileSelected(e: any) {
		let image: Blob = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e?.target?.result?.toString();
		};
	}
</script>

<div id="app">
	<h1>Upload Image</h1>

	<p>Description:</p>
	<input class="desc" bind:value={description} />

	<select name="schools" id="school-select" bind:value={school}>
		{#each Schools as school}
			<option value={school}>{school}</option>
		{/each}
	</select>

	{#if avatar}
		<img class="file" src={avatar} alt="d" />
	{/if}

	<button
		class="upload"
		on:click={() => {
			fileinput.click();
		}}
	>
		Upload
	</button>

	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileinput}
	/>

	<button on:click={uploadToStore}> Submit </button>

	{#if success}
		<p>Your file was uploaded successefully!</p>
	{:else}
		<p>{errorMsg}</p>
	{/if}
</div>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	button {
		margin: 0.5rem;
	}

	#school-select {
		margin: 0.5rem;
	}

	.upload {
		cursor: pointer;
	}

	.file {
		display: flex;
		height: 200px;
		width: 200px;
	}

	.desc {
		width: 10vw;
		margin-top: 0.1rem;
		margin-bottom: 1rem;
	}
</style>
