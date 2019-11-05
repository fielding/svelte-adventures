<script>
	import { onMount, beforeUpdate } from 'svelte';
	import { mainScreen } from '../stores/account-context.js';
	import Profile from './Profile.svelte';
	import Streaks from './Streaks.svelte';
	import Wallet from './Wallet.svelte';

	let main;

	const scrollIndex = {
		'Wallet': 0,
		'Profile': 1,
		'Streaks': 2,
	};

	onMount(() => {
		main.style.scrollBehavior = 'auto';
		main.scrollLeft = scrollIndex[$mainScreen] * main.clientWidth;
		main.scrollTop = 0;
		main.removeAttribute('style');
	})

	beforeUpdate(() => {
		main && (main.scrollLeft = scrollIndex[$mainScreen] * main.clientWidth);
	});

</script>

<div class="main" bind:this={main}>
		<Wallet/>
		<Profile/>
		<Streaks/>
</div>

<style>
	.main {
		position: absolute;
		max-width: 374px;
		width: 100%;
		height: 100%;
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
