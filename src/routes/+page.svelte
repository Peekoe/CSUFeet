<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<body>
  <Navbar />

  <section class="hero is-large is-info" id="hero">
    <div class="hero-body">
      <p class="title">
        CSUFeet
      </p>
      <p class="subtitle">
        The best place to post feet online
      </p>
    </div>
  </section>

  <Footer />  
</body>


<style>
   body {
    margin: 0;
    padding: 0;
    height: 100vh;
  }

  #hero {
    background-color: darkred;
  }

  .title {
    font-size: 2.5rem;
  }
</style>