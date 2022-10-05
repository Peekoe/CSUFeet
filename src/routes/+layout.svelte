<script lang="ts">
  import { prefetch } from '$app/navigation';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import navigationState from '$src/stores/navigationStates';

  onMount(() => {
    prefetch('/home');
  });
</script>

<svelte:window
	on:sveltekit:navigation-start={() => {
		$navigationState = 'loading';
	}}
	on:sveltekit:navigation-end={() => {
		$navigationState = 'loaded';
	}}
/>

{#if $navigationState === 'loading'}
  <body>
    <div class="loading">
      <progress class="progress is-danger" max="100">30%</progress>
    </div>
  </body>
{:else}
  <body>
    <header>
      <Navbar />
    </header>
  
    <slot />
  
    <footer>
      <Footer />
    </footer>
  </body>
{/if}

<style>
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  header,
  footer {
    flex: none;
  }

  progress {
    max-width: 30%;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
