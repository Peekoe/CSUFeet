<script lang="ts">
	import type { PostDTO } from 'src/db';
	export let data: PostDTO;
	let url = data.image as string;
</script>

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

	.card-image {
		display: flex;
		justify-content: center;
	}

	img {
		object-fit: scale-down;
		max-width: 15vw;
		max-height: 100%;
	}
</style>
