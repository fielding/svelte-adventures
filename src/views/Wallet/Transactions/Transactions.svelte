<script>
	import Transaction from '../Transaction/Transaction.svelte';
	import transactions from './data.js';
</script>

<div>
{#each transactions as transaction }
	<Transaction data={transaction} />
{/each}
</div>

<style lang="stylus" src="styles.styl"></style>
