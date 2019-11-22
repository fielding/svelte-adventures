<script>
 import AccountScreen from '~/views/AccountScreen/AccountScreen.svelte';
 import Balance from '~/views/Balance/Balance.svelte';
 import BalanceHistoryChart from './BalanceHistoryChart/BalanceHistoryChart.svelte';
 import Change from '~/views/Change/Change.svelte';
 import Transactions from './Transactions/Transactions.svelte';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title"><Balance /></h2>
	<h5><button type="button" class="unstyledButton">Balance</button></h5>
	<Change fontSize=".85em"/>
	<BalanceHistoryChart maxHeight="5.75em" />
	<button class="transfer" type="button">Send</button><button class="transfer" type="button">Receive</button>
	<Transactions />
</AccountScreen>

<style lang="stylus" src="styles.styl"></style>
