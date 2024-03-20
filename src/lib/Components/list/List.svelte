<script lang="ts">
	import { writable } from 'svelte/store';
	import axios from 'axios';

	export let lists_info: any;

	let skip = 0;
	let take = 10;
	let loading = false;
	let all_loaded = false;

	const errors = writable<string[]>([]);

	async function loadmore() {
		skip += 10;
		const { data, status } = await axios.get(`/api/list?skip=${skip}&take=${take}`, {
			validateStatus: () => true
		});
		all_loaded = data.length <= 0;
		return data;
	}
</script>

{#if lists_info.list_count <= 0}
	<p>your lists are empty create a new one !</p>
{:else}
	<p>you have {lists_info.list_count} lists</p>
{/if}
<ol>
	{#each lists_info.lists as list}
		<li>
			<div class="list">
				<a class="title" href={`/app/${list.id}`}>{list.title}</a>
				<div class="info">
					<p class="date">{list.createdAt}</p>
					<p class="blocks">{list.blocks.length} blocks</p>
				</div>
			</div>
		</li>
	{/each}
	<button
		class="load-button"
		on:click={async () => {
			loading = true;
			const data = await loadmore();

			lists_info.lists = [...lists_info.lists, ...data];
			loading = false;
		}}
		disabled={loading || all_loaded}>{all_loaded ? 'All Lists Are Loaded' : 'LoadMore'}</button
	>
</ol>

<style lang="scss">
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
		.load-button {
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
			margin-block: 1rem;
			cursor: pointer;
			&:disabled {
				background: rgba(240, 248, 255, 0.1);
				cursor: auto;
			}
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
