<script>
	import { beforeUpdate, onMount } from 'svelte';
	import { mainScreen, mainTarget, stackedScreen, currentScreen, navigate } from '~/views/Account/store.js';
	import Settings from '~/views/Settings/Settings.svelte';
	import Achievements from '~/views/Achievements/Achievements.svelte';

	$: wallet = $mainScreen === 'Wallet';
	$: profile = $mainScreen === 'Profile';
	$: streaks = $mainScreen === 'Streaks';
</script>

<nav>
	<div class="left">
		<button type="button" class={$currentScreen === 'Achievements' ? 'selected' : '' } on:click={() => navigate(Achievements)}>
			<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
				<path clip-rule="evenodd" fill-rule="evenodd" d="m14.3034 43.0513c-.9369 2.4701-.3173 4.9487-.3173 4.9487h19.6923s.6196-2.4786-.3173-4.9487c-4.0818-.2336-5.3455-2.0453-5.7051-4.5059-1.0816-.2497-2.3463-.3916-3.8237-.3916-1.4776 0-2.7423.1419-3.8239.3916-.3596 2.4606-1.6233 4.2723-5.705 4.5059zm9.5289-7.359c22.8074.0943 17.2307-35.6923 17.2307-35.6923h-34.4615s-5.57669 35.598 17.2308 35.6923zm1.4932-21.8263-1.5712-3.241-1.5712 3.241-3.5691.4929 2.5976 2.4958-.6344 3.5455 3.1771-1.6989 3.1767 1.6989-.6339-3.5455 2.5975-2.4958z" />
			</svg>
		</button>
	</div>
	<div class="pill">
		<button type="button" class:current={$mainScreen === 'Wallet'} class:selected={$currentScreen === 'Wallet'} class="wallet" on:click={() => navigate('Wallet')}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
				<path d="M39.0635 10.24V6.34667C39.0635 2.82667 36.1739 0 32.6956 0c-.7491 0-1.4448.106667-2.1404.373333L2.14047 10.4C.856187 10.8267 0 12.0533 0 13.3867v31.4666C0 46.6133 1.44482 48 3.15719 48H38.4749C43.7191 48 48 43.7333 48 38.5067V19.7333c0-5.0666-3.9064-9.2266-8.9365-9.4933zm-6.3679-3.89333V10.24H21.6722l11.0234-3.89333zm5.7793 35.30663H6.36789v-25.12H38.4749c1.7659 0 3.1572 1.44 3.1572 3.1467v1.8133h-2.9966c-3.9599 0-7.1706 3.2-7.1706 7.1467v.8533c0 3.9467 3.2107 7.1467 7.1706 7.1467h3.0501v1.8133c0 1.8134-1.4448 3.2-3.2107 3.2zm3.2107-13.76v2.4534H38.689c-.4281 0-.8027-.3734-.8027-.8v-.8534c0-.4266.3746-.8.8027-.8h2.9966z"/>
			</svg>
		</button>
		<button type="button" class:current={$mainScreen === 'Profile'} class:selected={$currentScreen === 'Profile'} class="profile" on:click={() => navigate('Profile')}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
				<path d="M36.0142 12.3933c0 6.8447-5.5487 12.3933-12.3933 12.3933-6.8447 0-12.3934-5.5486-12.3934-12.3933C11.2275 5.54868 16.7762 0 23.6209 0c6.8446 0 12.3933 5.54868 12.3933 12.3933zM46.2413 39.0291c0 1.9665-.2295 5.2127-2.9353 6.6912C39.1949 47.9667 31.1549 48 23.6207 48c-7.5342 0-15.86948-.0333-19.98056-2.2797-2.705782-1.4785-2.64-4.7247-2.64-6.6912 0-4.9546 10.12756-8.971 22.62056-8.971s22.6206 4.0164 22.6206 8.971z"/>
			</svg>
		</button>
		<button type="button" class:current={$mainScreen === 'Streaks'} class:selected={$currentScreen === 'Streaks'} class="streaks" on:click={() => navigate('Streaks')}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
				<path d="M34.3932 21.2071C25.7427 10.2568 27.7103 1 27.7103 1-2.78639 25.8546 10.916 38.3556 11.9986 39.3905c2.5884 2.474 4.6442 4.0509 4.6696 8.3787 1.9262-1.8531 8.2907-5.9672 2.3447-15.0679 0 0-5.3106-7.1338 4.2962-13.829-.3122 15.218 11.7534 13.3159 4.4619 28.8274.0001.0001 22.3481-6.586 6.6222-26.4926z"/>
			</svg>
		</button>
		<div class:wallet class:profile class:streaks class="indicator" />
	</div>
	<div class="right">
		<button type="button" class={$currentScreen === 'Settings' ? 'selected' : '' } on:click={(e) => navigate(Settings)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
				<g clip-path="url(#clip0)">
					<path fill-rule="evenodd" d="M19.4111 0l3.3134 4.56933h2.4788L28.6327 0s3.126.574562 4.9279 1.41221c1.802.83765 4.1767 2.32145 4.1767 2.32145l-.933 5.75113 1.7373 1.70681c1.8981-.2899 5.6943-.8566 5.6943-.8051 0 .004.0268.0391.0754.1025.3116.4075 1.5185 1.9854 2.2609 4.0327C47.4303 16.8878 48 19.3391 48 19.3391l-4.6327 3.4135v2.4475L48 28.5815s-.5728 2.9137-1.2552 4.467c-.6823 1.5533-2.541 4.6466-2.541 4.6466l-5.6622-.8695-1.8016 1.6746.9651 5.7322s-2.3889 1.4525-4.1243 2.2276c-1.7353.7751-4.9481 1.5402-4.9481 1.5402l-3.4242-4.7244-2.3881.0414-3.4209 4.683s-2.9894-.6289-4.8558-1.4595c-1.8664-.8305-4.2809-2.3405-4.2809-2.3405l.9328-5.7644-1.80157-1.7068-5.59765.9339s-1.68534-2.5643-2.48675-4.5217C.508232 31.1839 0 28.6137 0 28.6137l4.66494-3.4458v-2.4557L0 19.2425s.574317-2.708 1.68098-5.276c1.10667-2.568 2.11533-3.741 2.11533-3.741l5.59772.9017 1.76037-1.67729-.8731-5.71625s2.4187-1.5636 4.6739-2.51495C17.2104.267363 19.4111 0 19.4111 0zm4.5484 35.45c5.813 0 10.5254-4.7171 10.5254-10.5358 0-5.8188-4.7124-10.5359-10.5254-10.5359s-10.5254 4.7171-10.5254 10.5359c0 5.8187 4.7124 10.5358 10.5254 10.5358z" clip-rule="evenodd"/>
				</g>
				<defs>
					<clipPath id="clip0">
						<path fill="#fff" d="M0 0h48v48H0z"/>
					</clipPath>
				</defs>
			</svg>
		</button>
	</div>
</nav>

<style lang="scss" src="styles.scss"></style>
