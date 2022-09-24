<script lang="ts">
  import type { FirebaseApp } from 'firebase/app';
  import type { FirebaseStorage } from 'firebase/storage';
  import type { Firestore } from 'firebase/firestore';
  import type { PostDTO } from '$src/db';
  import { uploadPost, Schools } from '$src/db';
  import { getFirebaseApp, getDb, getFirebaseStorage } from '$src/init';
  import { onMount } from 'svelte';

  let app: FirebaseApp;
  let storage: FirebaseStorage;
  let db: Firestore;
  let success = false;
  let pending = false;
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
    errorMsg = '';
    const uploadImage = fileinput.files.item(0);
    
    if (uploadImage.size / 1024 / 1024 >= 2.5) // 2.5 MiB for bytes.
    {
      errorMsg = "Image must be less than 2.5 MB"
      return;
    }

    pending = true;
    let post: PostDTO = {
      description: description,
      image: uploadImage,
      likes: 0,
      pending: true,
      school: school,
      created: Date.now()
    };
    let result = await uploadPost(storage, db, post);
    success = result.success;
    errorMsg = result.message;

    if (success) {
      pending = false;
    }
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
  {#if avatar}
    <img class="file" src={avatar} alt="Uploaded" />
  {/if}

  <input
    class="desc input is-dark"
    type="text"
    placeholder="Description"
    bind:value={description}
  />

  <div name="schools" class="select is-rounded is-dark school-select">
    <select id="school-select" bind:value={school}>
      {#each Schools as school}
        <option value={school}>{school}</option>
      {/each}
    </select>
  </div>

  <button
    class="button is-rounded is-dark"
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

  {#if !success && !pending}
    <button class="button is-rounded is-dark" on:click={uploadToStore}>Submit</button>
  {:else if pending}
    <button class="button is-loading is-rounded is-dark">Loading</button>
  {:else if !success}
    <button class="button is-danger is-dark" on:click={uploadToStore}>Error</button>
  {:else}
    <button class="button is-success is-rounded is-dark">Success</button>
  {/if}

  {#if errorMsg !== ''}
    <div class="notification is-danger">
      {errorMsg}
    </div>
  {/if}
</div>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }

  img {
    margin: 1rem;
  }

  button {
    margin: 0.5rem;
    width: 30vw;
  }

  .school-select {
    margin: 0.5rem;
  }

  #school-select {
    width: 30vw;
  }

  .file {
    display: flex;
    height: 200px;
    width: 200px;
  }

  .desc {
    width: 30vw;
    margin-top: 0.1rem;
    margin-bottom: 1rem;
  }
</style>
