<script lang="ts">
  import firebaseConfig from "../../env";
	import { FirebaseApp, initializeApp } from "firebase/app";
	import { Schools, uploadFile, Post } from '../../db';
	import { onMount } from 'svelte';
	import { FirebaseStorage, getStorage } from "firebase/storage";
	import { Firestore, getFirestore } from "firebase/firestore";

	let app: FirebaseApp;
	let storage: FirebaseStorage;
	let firestore: Firestore;
	let success = false;

	onMount(async () => {
		app = initializeApp(firebaseConfig);
		storage = getStorage(app);
		firestore = getFirestore(app);
	});

	let avatar: string | null | undefined;
	let fileinput: HTMLInputElement;

	function onFileSelected(e) {
		let image: Blob = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			var dec = new TextDecoder();
			avatar = e?.target?.result?.toString();
		};
	}

  async function uploadToStore() {
		let post: Post = {school: 'CSUF', image: fileinput.files.item(0)};
		success = await uploadFile(storage, post);
  }
</script>

<div id="app">
	<h1>Upload Image</h1>

	{#if avatar}
		<img class="file" src={avatar} alt="d" />
	{/if}

	<button class="upload" on:click={() => {fileinput.click();}}>
		Upload
	</button>

	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileinput}
	/>

  <button on:click="{uploadToStore}">
    Submit
  </button>

	{#if success}
		<p>
			Your file was uploaded successefully!
		</p>
	{/if}
</div>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	.upload {
		cursor: pointer;
	}

	.file {
		display: flex;
		height: 200px;
		width: 200px;
	}
</style>
