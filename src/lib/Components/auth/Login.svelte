<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';

	let loading = false;
	let errors: string[] = [];

	async function login(e: any) {
		const { data, status } = await axios.post(
			'/auth/login',
			{
				username: e.target.user.value,
				password: e.target.pass.value
			},
			{
				validateStatus: () => true
			}
		);
		if (status === 200) {
			goto('/app', { invalidateAll: true });
			console.log('success');
		} else if (status === 404) {
			errors.push('user not found');
		} else if (status === 402) {
			errors.push('wrong password');
		}
		loading = false;
	}
</script>

<div class="forms">
	<form
		on:submit|preventDefault={async (e) => {
			loading = true;
			errors = [];
			await login(e);
		}}
	>
		<div class="place">
			<label for="user">Username</label>
			<input name="user" type="text" />
		</div>
		<div class="place">
			<label for="pass">Password</label>
			<input name="pass" type="password" />
		</div>
		<button type="submit">Login</button>
	</form>
	<div class="errors">
		{#each errors as err}
			<p class="error">{err}</p>
		{/each}
	</div>
	<p class="reminder">
		Don't Have An Account ?
		<a href="/auth/register">Register</a>
	</p>
	<p class="reminder">
		Forgot Your Password ?
		<a href="/auth/reset">Reset It</a>
	</p>
</div>

<style lang="scss">
	@import './style.scss';
</style>
