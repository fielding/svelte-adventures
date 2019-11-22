
<script>
	import AreaChart from '~/components/AreaChart/AreaChart.svelte';

	let rangeOptions = ['1D', '1W', '1M', '3M', '6M', 'ALL'];

	let current = 5;

	const selectRange = index => {
		current = index;
	};

</script>

<AreaChart maxHeight="5.75em" />
<ul>
	{#each rangeOptions as range, index}
		<li class:active={current === index} on:click={ () => selectRange(index)}>
			<span class="content">
				{range}
			</span>
		</li>
	{/each}
</ul>

<style lang="stylus" src="styles.styl"></style>
