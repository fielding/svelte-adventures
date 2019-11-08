<script>
import AccountScreen from './Screen.svelte';
import response from '../data/streaksData.js';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title">Streaks</h2>
	<div>
		<img alt="Special Triage Nicholas" src="https://i.imgur.com/Do459v1.png" />
	</div>
</AccountScreen>

<style>
	div {
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 75%;
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
