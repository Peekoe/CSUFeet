<script lang="ts">
  import type { FirebaseApp } from 'firebase/app';
  import type { Firestore } from 'firebase/firestore';
  import type { FirebaseStorage } from 'firebase/storage';
  import type { PostDTO } from '$src/db';
  import { onMount } from 'svelte';
  import { getFirebaseApp, getDb, getFirebaseStorage } from '$src/init';
  import { fetchTopPosts } from '$src/db';
  import Post from './Post.svelte';

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
    <progress class="progress is-danger" max="100">30%</progress>
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
    /* align-items:baseline; */
    overflow-y: auto;
    width: 100vw;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  progress {
    max-width: 30%;
  }

  @media screen and (max-width: 800px) {
    .container { 
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
