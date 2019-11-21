<script>
	// TODO:
	//	- wire up wallet store for balance value
	import BigNumber from 'bignumber.js/bignumber.mjs';
	import VidyCurrencyDisplay from '~/components/VidyCurrencyDisplay/VidyCurrencyDisplay.svelte';

	// TODO: wire this up to the store once I move move these over to the svelte refactor branch
	let wei = '3989719453684785598361';
	let vidy = BigNumber(wei).dividedBy(1e18);

</script>

<VidyCurrencyDisplay amount={vidy} />
