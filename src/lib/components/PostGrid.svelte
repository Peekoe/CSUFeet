<script lang="ts">
  import type { FirebaseApp } from 'firebase/app';
  import type { Firestore } from 'firebase/firestore';
  import type { FirebaseStorage } from 'firebase/storage';
  import type { PostDTO } from '$src/db';
  import { onMount } from 'svelte';
  import { getFirebaseApp, getDb, getFirebaseStorage } from '$src/init';
  import Post from './Post.svelte';

  let app: FirebaseApp;
  let storage: FirebaseStorage;
  let db: Firestore;
  export let posts: PostDTO[] = [];

  onMount(async () => {
    app = getFirebaseApp();
    storage = getFirebaseStorage();
    db = getDb();
  });
</script>

<div class="container">
  {#each posts as post}
    <Post data={post} />
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 100vw;
  }

  @media screen and (max-width: 800px) {
    .container { 
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
