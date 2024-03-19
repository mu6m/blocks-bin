<script>
	import Register from '$lib/Components/auth/Register.svelte';
</script>

<svelte:head>
	<title>BlocksBin | Register</title>
</svelte:head>

<div class="form">
	<Register />
</div>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
