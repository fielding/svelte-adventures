<script>
import AccountScreen from './AccountScreen.svelte';
import response from '../data/streaksData.js';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title">Streaks</h2>
	<div>
		<img class="avatar" alt="Special Triage Nicholas" src="https://i.imgur.com/v47Gy36.png" />
	</div>
</AccountScreen>

<style>
	div {
		height: 60%;
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

</style>
