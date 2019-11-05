<script>
export let swipeable = false;
</script>

<div class="screen" class:swipeable>
	<slot name="title"></slot>
	<slot></slot>
</div>

<style>
	.screen {
		flex: 1 1 374px;
		scroll-snap-align: center;
		max-width: 374px;
		min-width: 100%;
		text-align: center;
		position: absolute;
		background-color: #000000;
	}

	.swipeable {
		position: relative;
	}
</style>
