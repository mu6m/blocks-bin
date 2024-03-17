<nav>
	<div class="items">
		<h2><a href="/">BlocksBin</a></h2>
		<div class="right">
			<a href="/why-us">Why Us</a>
			<a href="/auth/login">Login</a>
			<a href="/auth/register">Register</a>
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
			}
		}
	}
	a {
		color: aliceblue;
	}
</style>
