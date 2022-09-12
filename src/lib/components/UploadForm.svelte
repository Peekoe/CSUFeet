<script lang="ts">
  import { each } from 'svelte/internal';
import {Schools} from '../../db';

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

  function uploadToStore() {

  }
</script>

<div id="app">
	<h1>Upload Image</h1>

	{#if avatar}
		<img class="avatar" src={avatar} alt="d" />
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

	.avatar {
		display: flex;
		height: 200px;
		width: 200px;
	}

  ul {
    list-style: none;
  }
</style>
