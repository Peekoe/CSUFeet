<script lang="ts">
  import { prefetch } from '$app/navigation';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  onMount(() => {
    prefetch('/home');
  });
</script>

<body>
  <header>
    <Navbar />
  </header>

  <slot />

  <footer>
    <Footer />
  </footer>
</body>

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
</style>
