<script lang="ts">
  import type { PostDTO } from 'src/db';
  import logos from './logos';
  export let data: PostDTO;
  let url = data.image as string;
</script>

<div class="card">
  <div class="card-image is-overflow-hidden">
    <figure class="image">
      <img src={url} alt="Post" />
    </figure>
  </div>

  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <img src="{logos[data.school]}" alt="{data.school}" title="{data.school}">
      </div>
    </div>

    <div class="content">
      {data.description}
      <br />
      {new Date(data.created).toLocaleDateString()}
    </div>
  </div>
</div>

<style>
  .card {
    margin: 1rem;
    width: 15vw;
    min-height: 25vh;
  }

  @media screen and (max-width: 800px) {
    .card {
      width: 80vw;
    }
  }

  .card .content {
    overflow-wrap: break-word;
  }

  .card .card-image .image img {
    height: 30vh;
    object-fit: contain;
  }

  .media-content img {
    max-width: 32px;
    max-height: 32px;
  }

  .media-content img {
    max-width: 32px;
    max-height: 32px;
  }
</style>
