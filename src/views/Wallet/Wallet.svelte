<script>
 import AccountScreen from '~/views/AccountScreen/AccountScreen.svelte';
 import Balance from '~/views/Balance/Balance.svelte';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title">Wallet</h2>
	<div>
		<img alt="$$ Vidy TV $$"src="https://i.imgur.com/CqUfJMN.png" />
	</div>
</AccountScreen>

<style lang="scss" src="styles.scss"></style>
