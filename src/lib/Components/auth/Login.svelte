<div class="forms">
	<form action="/auth/login" method="post">
		<div class="place">
			<label for="user">Email Or Username</label>
			<input name="user" type="text" />
		</div>
		<div class="place">
			<label for="pass">Password</label>
			<input name="pass" type="password" />
		</div>
		<button type="submit">Login</button>
	</form>
	<div class="errors">
		<p class="error"></p>
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
