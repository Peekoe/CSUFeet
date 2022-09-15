<script lang="ts">
	export let url: string = '';
	export let name: string = '';
	export let description: string = '';
	export let school: string = '';
</script>

<div class="post">
	<img class="image" src="{url}" alt="{name}">
	<div class="text">
		<p>{description}</p>
		<p>{school}</p>
	</div>
</div>

<style>
	.image {
		object-fit: contain;
		height: 50%;
		width: 95%;
	}

	.post {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 2px solid black;
		border-radius: 0.5rem;
		width: 20vw;
		height: 30vh;
		margin: 0.25rem;
	}

	.text {
		text-align: left;
	}
</style>