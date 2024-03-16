<script>
</script>

<svelte:head>
	<title>BlocksBin</title>
	<meta name="description" content="BlocksBin Sort Your Text Blocks" />
</svelte:head>

<div class="header">
	<h1>BlocksBin</h1>
	<p>sort and secure your text</p>
	<div class="steps">
		<div class="step">
			<p>Create Your Blocks</p>
		</div>
		<div class="line"></div>
		<div class="step">
			<p>Encrypt Them</p>
		</div>
		<div class="line"></div>
		<div class="step">
			<p>Upload Them</p>
		</div>
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		h1 {
			font-size: 2.3rem;
			margin: 0;
		}
		.steps {
			display: flex;
			align-items: center;
			gap: 1rem;
			.line {
				width: 3rem;
				height: 0px;
				border: 1px solid aliceblue;
			}
		}
	}
</style>
