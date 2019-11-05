<script>
	import { onMount } from 'svelte';
	import PromoCard from './PromoCard.svelte';
	
	const promoInfo = [
		{
			name: 'promo__friend_bonus',
			title: '2x Friend Bonus',
			body: 'Get a 5x bonus every time you and your friend watch the same Vidy',
			screen: 'FriendBonus',
		},
		{
			name: 'promo__lottery',
			title: 'Win Lottery',
			body: 'Theres a hidden jackpot under every 50 Vidys you hold. Good luck!',
			screen: 'Lottery',
		},
		{
			name: 'promo__onboarding',
			title: 'Earn 50 VidyCoin',
			body: 'Finish onboarding and earn 50 VidyCoin!',
			screen: 'Onboarding1',
		},
		{
			name: 'rewards',
			title: 'Unlock Trophies',
			body: 'Complete milestones and start earning VidyCoin!',
			screen: 'Rewards',
		},
];
	
const total = promoInfo.length;

let cards;
	
onMount(() => {
	const lastCardClone = cards.lastChild.cloneNode(true);
	cards.appendChild(cards.firstChild.cloneNode(true));
	cards.insertBefore(lastCardClone, cards.firstChild);
	
	const interval = setInterval(() => {
			console.log('beep');
		}, 1000);

	return () => clearInterval(interval);
});



	
</script>

<div class="promos" bind:this={cards}>
	{#each promoInfo as {name, title, body, screen}, index}
		<PromoCard {title} {body} {index} {total} />
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

