<script>
	import { onMount, beforeUpdate, tick } from 'svelte';
	import { smoothHorizontalScroll } from '~/utils/dom.ts';
	import { mainScreen, mainClientWidth, mainTarget} from '~/views/Account/store.js';
	import Profile from '~/views/Profile/Profile.svelte';
	import Streaks from '~/views/Streaks/Streaks.svelte';
	import Wallet from '~/views/Wallet/Wallet.svelte';

	let main;

	const scrollIndex = [
		'Wallet',
		'Profile',
		'Streaks',
	]

	const handleScroll = e => {
		if ($mainTarget === null) {
			$mainScreen = scrollIndex[Math.round(e.target.scrollLeft / $mainClientWidth)];
		}

		if (scrollIndex.indexOf($mainTarget) === Math.round(e.target.scrollLeft / $mainClientWidth)) {
			$mainScreen = $mainTarget;
			$mainTarget = null
		}
	};

	onMount(async () => {
		main.style.scrollBehavior = 'auto';
		main.scrollLeft = scrollIndex.indexOf($mainScreen) * $mainClientWidth;
		main.scrollTop = 0;
		await tick();
		main.removeAttribute('style');
	});

	beforeUpdate(() => {
		if ($mainTarget && main) {
			if ('scrollBehavior' in document.documentElement.style) {
				main.scrollTo(scrollIndex.indexOf($mainTarget) * $mainClientWidth, 0);
			} else {
				smoothHorizontalScroll(main, scrollIndex.indexOf($mainTarget) * $mainClientWidth);
			}
		}
	});

	// not sure if this would be preferred over the above (beforeUpdate() implementation);
	// $: if ($mainTarget) {
	// 		if ('scrollBehavior' in document.documentElement.style) {
	// 			main?.scrollTo(scrollIndex.indexOf($mainTarget) * $mainClientWidth, 0);
	// 			// main?.scrollLeft = (scrollIndex.indexOf($mainTarget) * $mainClientWidth);
	// 		} else {
	// 			smoothHorizontalScroll(main, scrollIndex.indexOf($mainTarget) * $mainClientWidth);
	// 		}
	// }
</script>

<div class="main" bind:clientWidth={$mainClientWidth} bind:this={main} on:scroll={handleScroll}>
		<Wallet/>
		<Profile/>
		<Streaks/>
</div>

<style lang="stylus" src="styles.styl"></style>
