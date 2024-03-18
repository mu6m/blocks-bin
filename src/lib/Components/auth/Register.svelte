<script lang="ts">
	import axios from 'axios';
	let sent = false;
	let code = false;

	//save it to transfer it to register forum
	let email = '';
	let email_disable = false;

	let loading = false;

	async function emailCheck(e: any) {
		loading = true;
		if (e.target.email && e.target.code) {
			const { data } = await axios.post('/auth/confirm', {
				email: e.target.email.value,
				code: e.target.code.value
			});
			console.log(data);
		} else if (e.target.email) {
			const { data } = await axios.post('/auth/confirm', {
				email: e.target.email.value
			});
			if (data.error === null) {
				sent = true;
				email_disable = true;
			}
		}
		loading = false;
	}
	async function register(e: any) {
		loading = true;
		loading = false;
	}
</script>

<div class="forms">
	{#if !code}
		<form on:submit|preventDefault={emailCheck} action="/auth/confirm" method="POST">
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
			{#if !loading}
				<button type="submit">{!sent ? 'Get Register Code' : 'Check Code'}</button>
			{:else}
				<button disabled={true}>Loading</button>
			{/if}
		</form>
	{:else}
		<form action="/auth/register" method="post">
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
			{#if !loading}
				<button type="submit">Register</button>
			{:else}
				<button disabled={true}>Loading</button>
			{/if}
		</form>
	{/if}
	<div class="errors">
		<p class="error"></p>
	</div>
	<p class="reminder">
		Already Have An Account ?
		<a href="/auth/login">Login</a>
	</p>
</div>

<style lang="scss">
	@import './style.scss';
</style>
