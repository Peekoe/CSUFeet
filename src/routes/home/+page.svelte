<script lang="ts">
  import PostGrid from '$lib/components/PostGrid.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<PostGrid posts={data.posts} />