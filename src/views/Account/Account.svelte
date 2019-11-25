<script>
	import { stackedScreen } from './store.js';
	import { onMount, onDestroy } from 'svelte';
	import { iOS } from '~/constants/device.ts';
	import { lockActionBar, lockScroll, disableDoubleTap } from '~/utils/safarcical.js';
	import AccountMain from './AccountMain/AccountMain.svelte';
	import AccountNav from './AccountNav/AccountNav.svelte';

	let account;

	onMount(() => {
		if (iOS) {
			lockActionBar();
			lockScroll(account, { tolerance: 4 });
		}

		disableDoubleTap()
	})

	onDestroy(() => {
		if (iOS) {
			unlockActionBar();
			unlockScroll(account);
		}
		enableDoubleTap();
	})
</script>

<div class="account" bind:this={account}>
	<svelte:component this={$stackedScreen || AccountMain} />
	<AccountNav />
</div>

<style lang="stylus" src="styles.styl"></style>
