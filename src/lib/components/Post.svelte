<script lang="ts">
	import type { PostDTO } from 'src/db';
	export let data: PostDTO;
	let url = data.image as string;
</script>

<!-- <div class="post">
	<img class="image" src="{url}" alt="{name}">
	<div class="text">
		<p>{description}</p>
		<p>{school}</p>
	</div>
</div> -->

<div class="card">
	<div class="card-image">
		<img src={url} alt="Post" />
	</div>
	<div class="card-content">
		<div class="media">
			<div class="media-content">
				<p class="title is-4">{data.school}</p>
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
		min-width: 10vw;
		/* max-height: 10vh; */
	}

	img {
		object-fit: scale-down;
		max-width: 15vw;
		max-height: 100%;
	}
</style>
