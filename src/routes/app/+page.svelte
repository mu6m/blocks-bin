<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import CreateList from '$lib/Components/list/CreateList.svelte';
	import List from '$lib/Components/list/List.svelte';
</script>

<div class="container">
	<h1>Welcome {$page.data.user.username}!</h1>
	<CreateList />
	<List lists_info={$page.data} />
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 50rem;
	}
</style>
