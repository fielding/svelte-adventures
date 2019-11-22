<script>
	// TODO:
	// - add alt attribute to avatar element
	import fromnow from 'fromnow';
	import BigNumber from 'bignumber.js/bignumber.mjs';

	export let data;

	let { account, amount, date_created, org } = data;

	const [quantity, unit] = fromnow(date_created, {max : 1}).split(' ');
	const [integer, fraction] = BigNumber(amount).dividedBy(1e18).toFixed(3, BigNumber.ROUND_HALF_UP).split('.');
</script>

<!-- <div class="transaction" onclick={handleClick}> -->
<div class="transaction">
	<img
		class="avatar"
		src={account ? account.avatar : org ? org.avatar : 'https://i.imgur.com/jyh02eu.png'}
	/>
	<div class="info">
			<span class="secondParty">
				{account ? account.username : data.org ? data.org.username : 'master_shredder'}
			</span>
			<span class="time">
				{quantity === 'just' ? `${quantity} ${unit}` : quantity + unit[0]}
			</span>
	</div>
	<div class="amount" class:received={amount > 0}>
		{integer}<span>{fraction !== undefined ? '.' + fraction + ' ' : ' '} VIDY</span>
	</div>
</div>

<style lang="stylus" src="styles.styl"></style>
