<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
	<div class="items">
		<h2><a href="/">BlocksBin</a></h2>
		<div class="right">
			<a href="/why-us">Why Us</a>

			{#if $page.data.user == null}
				<a href="/auth/login">Login</a>
				<a href="/auth/register">Register</a>
			{:else}
				<a href="/app">Dashboard</a>
				<form action="/auth/logout" method="post"><button type="submit">Logout</button></form>
			{/if}
		</div>
	</div>
</nav>

<style lang="scss">
	nav {
		width: 100%;
		display: flex;
		justify-content: center;
		.items {
			display: flex;
			justify-content: space-between;
			width: 100%;
			max-width: 40rem;
			padding-inline: 2rem;
			h2 {
				margin: 0;
				a {
					text-decoration: none;
				}
			}
			.right {
				display: flex;
				align-items: center;
				gap: 1rem;
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
		}
	}
	a {
		color: aliceblue;
	}
</style>
