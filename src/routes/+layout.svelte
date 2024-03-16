<script>
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>BlocksBin {new Date().getFullYear()}</p>
	</footer>
</div>

<style lang="scss">
	@import './style.scss';
	.app {
		display: flex;
		flex-direction: column;
	}

	footer {
		display: flex;
		justify-content: center;
	}
</style>
