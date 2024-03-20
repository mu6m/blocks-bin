<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import axios from 'axios';
	import { writable } from 'svelte/store';

	let loading = false;
	const errors = writable<string[]>([]);

	async function createlist(e: any) {
		const { data, status } = await axios.post(
			'/api/list/',
			{
				title: e.target.title.value
			},
			{
				validateStatus: () => true
			}
		);

		if (status === 200) {
			invalidateAll();
			console.log('success');
		} else if (status === 400) {
			errors.update((existingErrors) => [...existingErrors, 'title is required']);
		} else if (status === 500) {
			errors.update((existingErrors) => [...existingErrors, 'title already exists']);
		}
	}
</script>

<form
	class="add-title"
	on:submit|preventDefault={async (e) => {
		loading = true;
		$errors = [];

		await createlist(e);
		loading = false;
	}}
>
	<input type="text" name="title" placeholder="Type Your New Title" />
	<button type="submit" disabled={loading}>Add</button>
</form>
<div class="errors">
	{#each $errors as err}
		<p class="error">{err}</p>
	{/each}
</div>

<style lang="scss">
	.errors {
		.error {
			color: red;
		}
	}
	.add-title {
		display: flex;
		margin-block: 3rem;
		gap: 1rem;
		width: 100%;
		justify-content: center;
		input {
			width: 20rem;
			background: rgba(240, 248, 255, 0.5);
			border: 1px solid rgba(240, 248, 255);
			border-radius: 10px;
			padding-inline: 1rem;
			padding: 0.7rem;
			&:disabled {
				border: none;
				background: rgba(240, 248, 255, 0.1);
			}
			&::placeholder {
				color: white;
				opacity: 0.5;
			}
		}
		button {
			background-color: rgba(240, 248, 255);
			color: #1e1e1ed6;
			text-decoration: none;
			border-radius: 10px;
			padding-inline: 1rem;
			padding: 0.7rem;
			border: none;
			max-width: 9rem;
			width: 100%;
			align-self: center;
			cursor: pointer;
			&:disabled {
				background: rgba(240, 248, 255, 0.1);
				cursor: auto;
			}
		}
	}
</style>
