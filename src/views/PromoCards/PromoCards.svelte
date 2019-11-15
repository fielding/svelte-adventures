<script>
	import { onDestroy, onMount } from 'svelte';
	import { smoothHorizontalScroll } from '../../utils/dom.ts';
	import { iOS, TOUCHES } from '../../constants/device.ts';
	import PromoCard from './PromoCard.svelte';
	import promoInfo from './data.js';
	import { previouslyViewed } from './store.js';

	let cards;
	let current;
	let intervalId;
	let promoScrollTimeout;

	const scrollToPromo = (index, behavior = 'smooth') => {
		if ('scrollBehavior' in document.documentElement.style) {
			requestAnimationFrame(() => cards.scrollTo({ left: cards.children[index].offsetLeft, top: 0, behavior }));
		} else {
			if ( behavior === 'smooth') {
				smoothHorizontalScroll(cards, cards.children[index].offsetLeft);
			} else {
				requestAnimationFrame(() =>{
					if (iOS) cards.style['-webkit-overflow-scrolling'] = 'auto';
						cards.scrollLeft = cards.children[index].offsetLeft;
					if (iOS) cards.removeAttribute('style');
				});
			}
		}
	};

	const prev = () => {
		if (!document.hidden) {
			intervalId = clearInterval(intervalId);
			if (current === 0) {
				cards.scrollLeft = cards.children[promoInfo.length].offsetLeft;
				current = promoInfo.length - 1;
			} else {
				current -= 1;
			}
			scrollToPromo(current);
			intervalId = setInterval(next, 5000);
		}
	};

	const next = () => {
		if (!document.hidden) {
			intervalId = clearInterval(intervalId);
			if (current === promoInfo.length + 1) {
				cards.scrollLeft = cards.children[1].offsetLeft;
				current = 2;
			} else {
				current += 1;
			}
			scrollToPromo(current);
			intervalId = setInterval(next, 5000);
		}
	};


	const handleScroll = async () => {
		// stop automatic scrolling
		intervalId = clearInterval(intervalId);
		// clear previously used scrollTimeout
		clearTimeout(promoScrollTimeout);
		// create looping illusion
		if (cards.scrollLeft <= cards.firstChild.offsetLeft) {
			scrollToPromo(4, 'auto');
		}

		if (cards.scrollLeft >= cards.scrollWidth - cards.clientWidth) {
			scrollToPromo(1, 'auto');
		}

		// update state after manual scrolling
		promoScrollTimeout = setTimeout(() => {
			if (!intervalId) intervalId = setInterval(next, 5000);
			current = Math.floor(cards.scrollLeft / cards.clientWidth);
		}, 66);
	}

	onMount(() => {
		const lastCardClone = cards.lastChild.cloneNode(true);
		cards.appendChild(cards.firstChild.cloneNode(true));
		cards.insertBefore(lastCardClone, cards.firstChild);

		current = $previouslyViewed;
		scrollToPromo(current, 'auto');

		intervalId = setInterval(next, 5000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
		clearTimeout(promoScrollTimeout);
		$previouslyViewed = current;
	});
</script>

<div class="promoCards">
	<div class="cards" bind:this={cards} on:scroll={handleScroll} >
		{#each promoInfo as {name, title, body, screen}, index}
			<PromoCard {title} {body} {index} total={promoInfo.length} />
		{/each}
	</div>
	{#if !TOUCHES}
		<button type="button" class="prev" on:click={prev}>
			<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
				<rect x="9.04602" y="24.0498" width="8.94109" height="33.8708" rx="4.47055" transform="rotate(-45 9.04602 24.0498)"/>
				<rect x="15.3223" y="30.3181" width="8.94109" height="33.9353" rx="4.47055" transform="rotate(-135 15.3223 30.3181)"/>
			</svg>
		</button>
		<button type="button" class="next" on:click={next}>
			<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
				<g transform="scale(-1, 1) translate(-48, 0)">
					<rect x="9.04602" y="24.0498" width="8.94109" height="33.8708" rx="4.47055" transform="rotate(-45 9.04602 24.0498)"/>
					<rect x="15.3223" y="30.3181" width="8.94109" height="33.9353" rx="4.47055" transform="rotate(-135 15.3223 30.3181)"/>
				</g>
			</svg>
		</button>
	{/if}
</div>

<style lang="scss" src="./style.scss"></style>

