<script lang="ts">
	import { page } from '$app/stores';
	import CreateBlock from '$lib/Components/CreateBlock.svelte';
</script>

<div class="center">
	<CreateBlock />
	<!-- <ol>
		<li>
			<div class="list">
				<p>Title</p>
			</div>
		</li>
	</ol> -->
</div>

<style lang="scss">
	.center {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		max-width: 40rem;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	ol {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		max-width: 40rem;
		width: 100%;
		justify-content: center;
		align-items: center;
		li {
			width: 100%;
			margin: 0 auto;
		}
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		.title {
			font-size: 1.5rem;
			margin: 0;
		}
		.info {
			display: flex;
			gap: 0.5rem;
			.blocks {
				font-size: 0.7;
				font-style: italic;
				font-weight: lighter;
			}
		}
	}
</style>
