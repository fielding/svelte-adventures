<script>
	import AccountScreen from '~/views/AccountScreen/AccountScreen.svelte';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title">Rewards</h2>
	<div>
		<img alt="Comrade Garrett" src="https://i.imgur.com/8HK8n46.png" />
	</div>
</AccountScreen>

<style>
	div {
		height: 520px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-weight: 500;
    font-size: 1.125em; /* 18px with parent font-size 16px */
    color: #ffffff;
    text-transform: initial;
    margin-top: 1em; /* same as this elements font-size */
    margin-bottom: 1em;
	}

	img {
		width: 100%;
	}
</style>
