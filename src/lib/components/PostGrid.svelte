<script lang="ts">
  import type { FirebaseApp } from 'firebase/app';
  import type { Firestore } from 'firebase/firestore';
  import type { FirebaseStorage } from 'firebase/storage';
  import type { PostDTO } from '$src/db';
  import { onMount } from 'svelte';
  import { getFirebaseApp, getDb, getFirebaseStorage } from '$src/init';
  import { fetchTopPosts } from '$src/db';
  import Post from './Post.svelte';
  import ProgressBar from './ProgressBar.svelte';

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

<div class={posts.length == 0 ? 'loading' : 'container'}>
  {#if posts.length == 0}
    <ProgressBar />
  {:else}
    {#each posts as post}
      <Post data={post} />
    {/each}
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 100vw;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  @media screen and (max-width: 800px) {
    .container { 
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
