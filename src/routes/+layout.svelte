<script>
	import Nav from '$lib/Components/Nav.svelte';
</script>

<svelte:head>
	<meta name="description" content="BlocksBin Sort And Encrypt Your Blocks" />
	<title>BlocksBin</title>
</svelte:head>
<div class="app">
	<Nav />

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
