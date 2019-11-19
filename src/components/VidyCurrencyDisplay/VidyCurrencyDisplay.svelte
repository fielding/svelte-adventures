<script>
// valid types:
//	coin: VidyCoin
//  points: Vidy Achievement Points
export let type = "coin"
export let amount = "0.0"

$: [integer, fraction] = amount.toString().split('.');
</script>

<div>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
		<path class={type} d="M24 48c13.2548 0 24-10.7452 24-24S37.2548 0 24 0 0 10.7452 0 24s10.7452 24 24 24z"/>
		<path d="M36.3897 15.1657l-8.623 20.7188h-7.5605l-8.5984-20.7188h7.5112l5.0157 12.637 5.2875-12.637h6.9675z"/>
		<path d="M29.1898 24.0637h6.2301v4.3106h-6.2301v-4.3106zM12.5772 24.0637h5.8148v4.3106h-5.8148v-4.3106z"/>
	</svg>
	{integer}{#if fraction !== undefined}
		<span>.{fraction}</span>
	{/if}
</div>

<style lang="scss" src="styles.scss"></style>
