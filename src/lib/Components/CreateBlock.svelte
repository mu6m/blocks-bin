<script lang="ts">
	import { page } from '$app/stores';
	import axios from 'axios';

	let blocks = 0;
	let alert_msg = '';
	let b_arr: any[] = [];
	if ($page.data.blocks.length > 0) {
		for (const item of $page.data.blocks) {
			b_arr.push(item.content);
			blocks += 1;
		}
	}
	async function send(arr: any[] = []) {
		let ax;
		if (arr.length > 0) {
			ax = await axios.post('/api/block', { id: $page.params.list, content: arr });
		} else {
			ax = await axios.post('/api/block', { id: $page.params.list, content: b_arr });
		}
		if (ax.status == 200) {
			alert_msg = 'Blocks sent';
		} else {
			alert_msg = 'ERROR IN SENDING BLOCKS !';
		}
	}
</script>

{#if alert_msg != ''}
	<p>{alert_msg}</p>
{/if}

<h2>number of blocks:</h2>
<input type="number" min="0" bind:value={blocks} />
{#each { length: blocks } as _, i}
	<h2>block number {i}</h2>
	<textarea rows="10" cols="30" bind:value={b_arr[i]} />
	<!-- <button
		on:click={async () => {
			let arr = [b_arr[i]];
			await send(arr);
		}}>Save</button
	> -->
{/each}
<br />
<br />
<br />
<button
	on:click={async () => {
		await send(b_arr);
	}}>Save All !</button
>
