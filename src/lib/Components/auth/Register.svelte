<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	let sent = false;
	let code = false;

	//save it to transfer it to register forum
	let email = '';
	let email_disable = false;
	let loading = false;
	let errors: string[] = [];

	async function emailCheck(e: any) {
		if (e.target.code) {
			const { data, status } = await axios.post(
				'/auth/check',
				{
					email: e.target.email.value,
					code: e.target.code.value
				},
				{
					validateStatus: () => true
				}
			);

			if (status === 200) {
				code = true;
			} else {
				errors.push('your code is wrong');
			}
		}

		if (e.target.email) {
			const { data, status } = await axios.post(
				'/auth/confirm',
				{
					email: e.target.email.value
				},
				{
					validateStatus: () => true
				}
			);
			if (status === 200) {
				sent = true;
				email_disable = true;
			} else if (status === 409) {
				sent = false;
				code = true;
				email_disable = true;
			} else if (status === 422) {
				goto('/auth/login');
			}
		}

		loading = false;
	}
	async function register(e: any) {
		const { data, status } = await axios.post(
			'/auth/register',
			{
				email: e.target.email.value,
				username: e.target.user.value,
				password: e.target.pass.value
			},
			{
				validateStatus: () => true
			}
		);
		if (status === 200) {
			goto('/auth/login');
		}
		loading = false;
	}
</script>

<div class="forms">
	{#if !code}
		<form
			on:submit|preventDefault={async (e) => {
				loading = true;
				errors = [];
				await emailCheck(e);
			}}
		>
			<div class="place">
				<label for="email">Your Email</label>
				<input name="email" disabled={email_disable} bind:value={email} type="text" />
			</div>
			{#if sent}
				<div class="place">
					<label for="code">Code</label>
					<input name="code" type="text" />
				</div>
			{/if}
			<button type="submit" disabled={loading}>{!sent ? 'Get Register Code' : 'Check Code'}</button>
		</form>
	{:else}
		<form
			on:submit|preventDefault={async (e) => {
				loading = true;
				errors = [];
				await register(e);
			}}
		>
			<div class="place">
				<label for="email">Email</label>
				<input name="email" disabled={email_disable} value={email} type="text" />
			</div>
			<div class="place">
				<label for="user">Username</label>
				<input name="user" type="text" />
			</div>
			<div class="place">
				<label for="pass">Password</label>
				<input name="pass" type="password" />
			</div>
			<button type="submit">Register</button>
		</form>
	{/if}
	<div class="errors">
		{#each errors as err}
			<p class="error">{err}</p>
		{/each}
	</div>
	<p class="reminder">
		Already Have An Account ?
		<a href="/auth/login">Login</a>
	</p>
</div>

<style lang="scss">
	@import './style.scss';
</style>
