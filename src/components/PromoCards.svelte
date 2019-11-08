<script>
	import { onMount } from 'svelte';
	import { smoothHorizontalScroll } from '../utils/dom.ts';
	import { TOUCHES } from '../constants/device.ts';
	import PromoCard from './PromoCard.svelte';
	import promoInfo from '../data/promoCards.js';

	let cards;
	let current;
	let intervalId;

	const scrollToPromo = index => {
		if ('scrollBehavior' in document.documentElement.style) {
			requestAnimationFrame(() => cards.scrollTo({ left: cards.children[index].offsetLeft, top: 0, behavior: 'smooth' }));
		} else {
			smoothHorizontalScroll(cards, cards.children[index].offsetLeft);
		}
	}

	const prev = () => {
		if (!document.hidden) {
			if (current === 0) {
				cards.scrollLeft = cards.children[promoInfo.length].offsetLeft;
				current = promoInfo.length - 1;
			} else {
				current -= 1;
			}
			scrollToPromo(current);
		}
	};

	const next = () => {
		if (!document.hidden) {
			if (current === promoInfo.length + 1) {
				cards.scrollLeft = cards.children[1].offsetLeft;
				current = 2;
			} else {
				current += 1;
			}
			scrollToPromo(current);
		}
	};

	onMount(() => {
		const lastCardClone = cards.lastChild.cloneNode(true);
		cards.appendChild(cards.firstChild.cloneNode(true));
		cards.insertBefore(lastCardClone, cards.firstChild);

		cards.scrollLeft = cards.children[1].offsetLeft;
		current = 1

		let intervalId = setInterval(next, 5000);

		if (TOUCHES) {
				// tmp = dom.create('button');
				// tmp.className = styles['acc__profile__promos__prev'];
				// tmp.onclick = e => {
				// 	dom.prevent(e);
				// 	intervalId = clearInterval(intervalId);
				// 	prev();
				// 	intervalId = setInterval(next, 5000);

				// };
				// dom.append(promos, tmp);

				// tmp = dom.create('button');
				// tmp.className = styles['acc__profile__promos__next'];
				// tmp.onclick = e => {
				// 	dom.prevent(e);
				// 	intervalId = clearInterval(intervalId);
				// 	next();
				// 	intervalId = setInterval(next, 5000);
				// };
				// dom.append(promos, tmp);
			} else {
				let promoScrollTimeout;

				cards.onscroll = () =>  {

					// stop automatic scrolling
					intervalId = clearInterval(intervalId);

					// create looping illusion
					// TODO: play around with threshold value to see if the scroll bouncing can be avoided/dampened
					if (cards.scrollLeft <= cards.firstChild.offsetLeft) {
						requestAnimationFrame(() => cards.scrollLeft = cards.scrollWidth - cards.children[1].offsetLeft - cards.clientWidth + cards.firstChild.offsetLeft);
					}

					if (cards.scrollLeft >= cards.scrollWidth - cards.clientWidth) {
						requestAnimationFrame(() => cards.scrollLeft = cards.children[1].offsetLeft);
					}

					// update state after manual scrolling
					clearTimeout(promoScrollTimeout);
					promoScrollTimeout = setTimeout(() => {
						intervalId = setInterval(next, 5000);
						current = Math.floor(cards.scrollLeft / cards.clientWidth);
					}, 66);
				};
			}

		return () => clearInterval(intervalId);
	});
</script>

<div class="promos" bind:this={cards}>
	{#each promoInfo as {name, title, body, screen}, index}
		<PromoCard {title} {body} {index} total={promoInfo.length} />
	{/each}
</div>

<style>
	.promos {
		max-width: 21em;
		position: relative;
		margin: .625em 1.1875em 0 1.1875em; /* 10px 19px 0 19px @ font-size 16 */
		overflow-y: hidden;
		overflow-x: scroll;
		display: flex;
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: mandatory; /* repeated below on purpose, this is to support legacy scroll snap api */
		-ms-scroll-snap-type: x mandatory;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>

