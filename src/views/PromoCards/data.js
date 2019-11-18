import FriendBonus from '~/views/FriendBonus/FriendBonus.svelte';
import Lottery from '~/views/Lottery/Lottery.svelte';
import Onboarding from '~/views/Onboarding/Onboarding.svelte';
import Achievements from '~/views/Achievements/Achievements.svelte';

const promoInfo = [
	{
		name: 'promo__friend_bonus',
		title: '2x Friend Bonus',
		body: 'Get a 5x bonus every time you and your friend watch the same Vidy',
		screen: FriendBonus,
	},
	{
		name: 'promo__lottery',
		title: 'Win Lottery',
		body: 'Theres a hidden jackpot under every 50 Vidys you hold. Good luck!',
		screen: Lottery,
	},
	{
		name: 'promo__onboarding',
		title: 'Earn 50 VidyCoin',
		body: 'Finish onboarding and earn 50 VidyCoin!',
		screen: Onboarding,
	},
	{
		name: 'achievements',
		title: 'Unlock Trophies',
		body: 'Complete milestones and start earning VidyCoin!',
		screen: Achievements,
	},
];

export default promoInfo;
