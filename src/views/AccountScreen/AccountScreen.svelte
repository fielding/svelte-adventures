<script>
	export let swipeable = false;
</script>

<div class="screen" class:swipeable>
	<slot name="title"></slot>
	<slot></slot>
</div>

<style>
	.screen {
		color: #ffffff;
		flex: 1 1 374px;
		height: 100%;
		max-width: 374px;
		min-width: 100%;
		position: absolute;
		scroll-snap-align: center;
		text-align: center;
	}

	.swipeable {
		position: relative;
	}
</style>
