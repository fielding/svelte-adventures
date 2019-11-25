<script>
	export let swipeable = false;
</script>

<div class="screen" class:swipeable>
	<slot name="title"></slot>
	<slot></slot>
</div>

<style lang="stylus" src="styles.styl"></style>
