<script>
	import AccountScreen from '~/views/AccountScreen/AccountScreen.svelte';
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
	</div>
	<PromoCards />
</AccountScreen>

<style>
	.card {
		background-color: #FFFFFF;
		background-repeat: no-repeat;
		box-shadow: 0px 10px 42px rgba(0, 0, 0, .128);
		border-radius: .5em; /* 8px @ 16px */
		max-width: 336px;
		height: 24.25em; /* 388px height at 16px font-size */
		left: 0;
		right: 0;
		margin: 4.5em 1.1875em 0 1.1875em; /* 72px auto 0 auto @ font-size 16px */
	}

	.avatar {
		border-radius: 50%;
		border: .375em solid #ffffff;
		background-color: #ffffff;
		height: 14.375em; /* 230px at 16px font-size */
		width: 14.375em;
		margin-top: -3em; /* -48px @ 16px font-size */
		border: .375em solid #ffffff; /* 6px solid $white @ 16px font-size */
		background-color: #ffffff;
	}

	.title {
		font-weight: 500;
    font-size: 1.125em; /* 18px with parent font-size 16px */
    color: #ffffff;
    text-transform: initial;
    margin-top: 1em; /* same as this elements font-size */
    margin-bottom: 1em;
	}
</style>
