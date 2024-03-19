<script>
	import Login from '$lib/Components/auth/Login.svelte';
</script>

<svelte:head>
	<title>BlocksBin | Login</title>
</svelte:head>

<div class="form">
	<Login />
</div>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
