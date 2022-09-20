<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<body>
  <header>
    <Navbar />
  </header>

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

  header, footer {
    flex: none;
  }

  #hero {
    background-color: #00274C;
    flex: auto;
  }

  .hero-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    height: 100%;
  }

  .title {
    font-size: 2.5rem;
  }
</style>