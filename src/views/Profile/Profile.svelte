<script>
	import AccountScreen from '~/views/AccountScreen/AccountScreen.svelte';
	import AreaChart from '~/components/AreaChart/AreaChart.svelte';
	import Balance from '~/views/Balance/Balance.svelte';
	import Change from '~/views/Change/Change.svelte';
	import PromoCards from '~/views/PromoCards/PromoCards.svelte';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title">@fielding</h2>
	<div class="card">
		<img class="avatar" alt="User's Avatar" src="https://i.imgur.com/OjaHwMY.png" >
		<Balance />
		<Change />
		<div class="chartContainer">
			<AreaChart maxHeight="7.5em" />
		</div>
	</div>
	<PromoCards />
</AccountScreen>

<style lang="scss" src="styles.scss"></style>
