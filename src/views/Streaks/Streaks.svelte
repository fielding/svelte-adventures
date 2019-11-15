<script>
import AccountScreen from '~/views/AccountScreen/AccountScreen.svelte';
import response from './data.js';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title">Streaks</h2>
	<div>
		<img alt="Special Triage Nicholas" src="https://i.imgur.com/Do459v1.png" />
	</div>
</AccountScreen>

<style lang="scss" src="styles.scss"></style>
