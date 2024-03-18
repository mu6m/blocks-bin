<script>
	import arrow from '$lib/assets/svg/Arrow.svg';
</script>

<svelte:head>
	<title>BlocksBin</title>
</svelte:head>

<div class="header">
	<div class="title">
		<h1>BlocksBin</h1>
		<p>sort and secure your text simply just 👇</p>
	</div>
	<div class="steps">
		<div class="step">
			<p>Create Your Blocks</p>
		</div>
		<object data={arrow} type="image/svg+xml" title="arrow" />
		<div class="step">
			<p>Encrypt Them</p>
		</div>
		<object data={arrow} type="image/svg+xml" title="arrow" />
		<div class="step">
			<p>Upload Them</p>
		</div>
	</div>
	<a href="/auth/register" class="start"> Start Now ! </a>
</div>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-block: 10rem;
		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			h1 {
				font-size: 5rem;
				margin: 0;
			}
		}
		.steps {
			margin-block: 4rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			border: rgba(240, 248, 255, 0.2) 1px solid;
			padding: 1rem;
			object {
				width: 100%;
				max-width: 2rem;
				transform: rotate(90deg);
			}
		}
		.start {
			background-color: rgba(240, 248, 255);
			color: #1e1e1ed6;
			text-decoration: none;
			border-radius: 10px;
			padding-inline: 1rem;
			padding: 0.7rem;
		}
	}
</style>
