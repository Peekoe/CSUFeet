<script lang="ts">
  import type { PostDTO } from 'src/db';
  import logos from './logos';
  export let data: PostDTO;
  let url = data.image as string;
</script>

<div class="card">
  <img src={url} alt="Post" class="foot-image"/>
  <div class="info">
    <div>
      <p>{data.school}</p>
      <img src={logos[data.school]} alt="School logo" class="school-logo" />
    </div>
  </div>

</div>

<style>
  .card {
    margin: 1rem;
    width: 15vw;
    min-height: 25vh;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .foot-image {
    height: 10vh;
    widows: 20vw;
  }

  .school-logo {
    height: 20px;
    width: 20px;
  }

  @media screen and (max-width: 800px) {
    .card {
      width: 80vw;
    }
  }

</style>
