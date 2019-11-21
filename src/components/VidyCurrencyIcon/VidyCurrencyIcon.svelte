<script lang="ts">
	export let title = "Vidy Currency Icon";
	// default to dark background, #2b2b2b, with white foreground
	export let bgColor = "#2b2b2b"; // set bgColor prop to "none" if no circle is desired
	export let fgColor = "#ffffff";
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-labledBy="title">
	<title id="title">{title}</title>
	<path fill={bgColor} d="M24 48c13.2548 0 24-10.7452 24-24S37.2548 0 24 0 0 10.7452 0 24s10.7452 24 24 24z"/>
	<path fill={fgColor} d="M36.3897 15.1657l-8.623 20.7188h-7.5605l-8.5984-20.7188h7.5112l5.0157 12.637 5.2875-12.637h6.9675z"/>
	<path fill={fgColor} d="M29.1898 24.0637h6.2301v4.3106h-6.2301v-4.3106zM12.5772 24.0637h5.8148v4.3106h-5.8148v-4.3106z"/>
</svg>

<style lang="stylus" src="styles.styl"></style>
