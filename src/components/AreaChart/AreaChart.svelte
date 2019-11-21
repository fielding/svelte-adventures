<script>
	import data from './data.js';
	import BigNumber from 'bignumber.js/bignumber.mjs';

	export let maxHeight = "100%";
	export let maxWidth = "100%";

	let height;
	let width;

	let hi;
	let lo;

	$: balanceHistory = data.map(i => BigNumber(i.balance));
	$: balanceHistory.forEach(balance => {
		if (hi === undefined || balance.isGreaterThan(hi)) {
			hi = balance;
		}
		if (lo === undefined || balance.isLessThan(lo)) {
			lo = balance;
		}
	})

	let xMin = 0;
	$: xMax = balanceHistory.length - 1;

	$: scaleY = y => height - Math.floor((y / ((hi - lo) / height)) - (lo / ((hi - lo) / height)));
	$: scaleX = x => (width / xMax) * x;

	$: points = balanceHistory.map((y, idx) => [scaleX(idx),  scaleY(y)])
	$: path = `M${points.map(([x, y]) => `${x},${y}`).join('L')}`;
	$: area = `${path}L${scaleX(xMax)},${scaleY(0)}L${scaleX(xMin)},${scaleY(0)}Z`;

</script>

<div bind:clientWidth={width} bind:clientHeight={height} class="chart" style={`max-width: ${maxWidth}; max-height: ${maxHeight};`}>
	<svg xmlns="http://www.w3.org/2000/svg">
		<linearGradient id='grad' gradientTransform='rotate(90)'>
			<stop offset='5%' stop-color='#ff3dac' stop-opacity='0.43'/>
			<stop offset='95%' stop-color='#ff3dac' stop-opacity='0.06'/>
		</linearGradient>
		<path class="line" d={path} />
		<path fill="url(#grad)" d={area} />
	</svg	>
</div>

<style lang="stylus" src="styles.styl"></style>
