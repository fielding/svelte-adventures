<script type="ts">
	// Reusuable component for displaying various vidy currency types in a
	// consistent format and style. (i.e. fraction to integer font-size ratio)
	// current currency types supported
	//	coin: VidyCoin
	//  points: Vidy Achievement Points
	import BigNumber from 'bignumber.js/bignumber.mjs';
	import VidyCurrencyIcon from '~/components/VidyCurrencyIcon/VidyCurrencyIcon.svelte';

	export let type = 'coin';
	export let amount = '0';

	const colorsByType = {
		coin: {
			bg: '#2b2b2b',
			fg: '#ffffff',
		},
		points: {
			bg: '#f33dac',
			fg: '#ffffff',
		},
	};
	const { bg, fg } = colorsByType[type];
	const bigAmount = BigNumber.isBigNumber(amount) ? amount : BigNumber(amount);
	// @ts-ignore - TODO
	$: [integer, fraction] = bigAmount.toFixed(3).split('.');
</script>

<div>
	<VidyCurrencyIcon bgColor={bg} fgColor={fg}/>
	{#if type === 'points'}
		{integer}
	{:else}
		{integer}<span>.{fraction}</span>
	{/if}
</div>

<style lang="stylus" src="styles.styl"></style>
