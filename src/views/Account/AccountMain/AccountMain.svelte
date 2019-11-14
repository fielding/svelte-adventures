<script lang='ts'>
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
		main.removeAttribute('style')
	});

	beforeUpdate(() => {
		if ($mainTarget) {
			if ('scrollBehavior' in document.documentElement.style) {
				main?.scrollTo(scrollIndex.indexOf($mainTarget) * $mainClientWidth, 0);
			} else {
				main && smoothHorizontalScroll(main, scrollIndex.indexOf($mainTarget) * $mainClientWidth);
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

<style>
	.main {
		position: absolute;
		max-width: 374px;
		width: 100%;
		height: calc(100% - 2.375em);
		display: flex;
		flex-wrap: nowrap;
		overflow-y: hidden;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		-ms-scroll-snap-type: x mandatory;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		scrollbar-width: none; /* Firefox hide scrollbars */
		-ms-overflow-style: none /* IE 10+ hide scrollbars */
	}

	.main::-webkit-scrollbar {
		display: none;
	}
</style>
