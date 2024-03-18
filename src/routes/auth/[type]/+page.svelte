<script>
	import { page } from '$app/stores';
	import Login from '$lib/Components/auth/Login.svelte';
	import Register from '$lib/Components/auth/Register.svelte';
</script>

<svelte:head>
	<title>BlocksBin | {$page.params.type}</title>
</svelte:head>

<div class="form">
	{#if $page.params.type == 'login'}
		<Login />
	{:else if $page.params.type == 'register'}
		<Register />
	{/if}
</div>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
