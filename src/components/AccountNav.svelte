<script>
	import { mainScreen, stackedScreen } from '../stores/account-context.js';
	import Settings from './Settings.svelte';
	import Rewards from './Rewards.svelte';

	const navigate = screen => {
		if (typeof screen === 'function') {
			$stackedScreen = $stackedScreen === screen ? null : screen;
		} else if (typeof screen === 'string') {
			$mainScreen = screen;
			$stackedScreen = null;
		}
	};

	$: selectedScreenName = $stackedScreen ? $stackedScreen.name : $mainScreen;

	$: wallet = $mainScreen === 'Wallet';
	$: profile = $mainScreen === 'Profile';
  $: streaks = $mainScreen === 'Streaks';

</script>

<nav>
	<button type="button" class={selectedScreenName === 'Rewards' ? 'rewards selected' : 'rewards' } on:click={() => navigate(Rewards)} />
	<div class="pill">
		<button type="button" class:current={$mainScreen === 'Wallet'} class:selected={selectedScreenName === 'Wallet'} class="wallet" on:click={() => navigate('Wallet')} />
		<button type="button" class:current={$mainScreen === 'Profile'} class:selected={selectedScreenName === 'Profile'} class="profile" on:click={() => navigate('Profile')} />
		<button type="button" class:current={$mainScreen === 'Streaks'} class:selected={selectedScreenName === 'Streaks'} class="streaks" on:click={() => navigate('Streaks')} />
		<div class:wallet class:profile class:streaks class="indicator" />
	</div>
	<button type="button" class={$stackedScreen && $stackedScreen.name === 'Settings' ? 'settings selected' : 'settings' } on:click={() => navigate(Settings)} />
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		padding: 0 1.25em 0 1.25em; /* 0 20px 0 20px @ font-size 16px */
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.pill {
		background-color: #F3F4F8;
		border-radius: 19px;
		display: flex;
		padding: 0;
		align-items: center;
		height: 2.375em; /* 38px @ font-size 16px */
		z-index: 0;
	}

	.pill button {
		margin-top: 0;
		margin-bottom: 0;
	}

	button {
			width: 2.875em; /* 46px @ font-size 16px */
			height: 2.375em; /* 38px @ font-size 16px */
			z-index: 2;
			cursor: pointer;
			padding: 0;
			background-repeat: no-repeat;
			background-position: center center;
			background-color: transparent;
			transition: opacity .35s, filter .468s;
			filter: grayscale(1) brightness(1.7);
			border: none;
			background-size: 1.25em;
	}

	button.rewards {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABy0lEQVR4Ae1ZK2zDMBA1R+Vk4aiwamIvnGycdJyUo3IUjgyrNXaNhsNROTqOzNFtcUEGuk55cbOblCedJgXYe/d9vqqfwJU/sHYswrYfT2osWPtGDAF9fkYIBDEESrcDCLhODIHK7ccTMI7kEPCH/02g9FaNRZaLFwILgYVAFEIAH0D4PMEJ5GqjdNVUbT3dGW0zN4H4ffxz5S6zDzIg9LEXXfeUI2/DmrWz80gJ7cdfZNoL13Z158w3MIVecDmNk8D/+Txy+oRfeJtAM+m8kUj5ihbwcMZpPRRy2MPnIeA6rEDt3nEdiqGGPHF53iWHgOcpFGyQ9ufpy+KN7zFrC8ULWf57OAGaovktqqkAQp/TbA4Cjcz0kZ9GpAAAukjALgiIggDvA7Ugxfv4ZDaOJHUegMSxeHBbJUC4ASLvMSSIN8dCQQAikTWdkgDEPQ/XRIbCjtBzMX9dODsqIlV76VXmDF4H6qNy+34NwqW3rH3o//aWvhm3S4/+BQt+ndghbSeMo2RXLRVYv78qSQAWAaRkAViGVW2tBAFYXHniTcg/ceFhdpXaHbC5sH8aDTae5v8ZFQGw9AKsUwAkvdBIVLuUT6AORVYCE/afn0wbN4cDZGbDAAAAAElFTkSuQmCC');
	  background-position: left;
		flex-grow: 2.5;
	}

	button.wallet {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAdVBMVEUAAAD/PK3/Par/O67/Paz/PKv/Paz/Pa3/PK//QJ//Pqz/Pav/Pa3/PKz/OrX/Pa3/QK//Paz/Pqv/O6z/O63/Pq3/Pa3/Pqv/Paz/OKf/Paz/Pa3/QK//OK//Pa7/Oqr/Pa3/Pan/Pav/Pa7/Oq//PKz/PazBaHHEAAAAJnRSTlMAf2Bfv0Dv728Q34+Pvx+fEN+AX5/fYM+fIK+vICA/MN9QcE8wbzSNoyQAAAEGSURBVHhetdRbb4MwDIZhhzqBJDBKR+lh3fHg//8Tp+pDnSaqxb7gvfYjEmSgf/Ntkpo3pMu3tSCOZfC8S/IbF8C2YfnbRjWtecTWcy33Kl3zVtcDPOimXSS/AMuXgoJ7IaIbKFwz5Ov0feBZFgW+dQDg9p3QJNresCJ70ddegVg6WoF8WEGIMzi7Qk+CvmfwSKUmAFYDOuJMelBhch3w2uDaSvDFgpRgEjGBixjB3gi8GEEDEIYh6IDDfCSqLGAgAP2Rzn3PK12akhV4KyBnBVQlA0CfeRzHzvwBrQ4a40/ggj3vZtBXhXY1BjOJrZMRZLKBIRLVBnA4YVW05YjlShoQOofxHyDHqbooef79AAAAAElFTkSuQmCC');
	}

	button.profile {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAflBMVEUAAAD/PKv/Pa3/Pqv/Pa3/Paz/Paz/O67/QK//Pa3/Pq3/Pa3/Pqv/QJ//QK//Paz/OK//Paz/Pan/Oqr/Pa3/PK3/PKz/PK//Pa3/Paz/PKv/Par/Paz/Pav/Oq//O6z/OKf/PKz/QKf/Pa7/Pav/O63/Pqz/Paz/PKz/PqwtNm62AAAAKnRSTlMAQI/P7/+vXxBg39+AECC/IO9QMJ9/b2+v389gn08wXyC/ID+Pn99Qz18qCg7qAAABGUlEQVR4Ae2Vg47FUABEq3mubev/P3CtZu8UycZ7omLONSQBsqJqgHo6X6Q9XG/45P7QN+OGiZ/cra38DUts51j+xXDXBA+/ues8f4UInwsmRNg67QHEBEwIiXBiQkSEmHeB8GdCdFRQSD5hQkqEjAkXIuQHZzqWKAVElCTNuq2SLGtUXK0KF5PkOf4iX+vSJk32HW+lXTRpV9d1HxTSP0Lc1PdO6jAM0IZBNT0/lS8se5EVU4MA1XMEkuxp4MA8L+OjiS3uZ3onUEX+3DYadvJ4L1/DbhxyJ1DsV0HDAdwXAUdoucBrGHAAnR/B/JRNsZ9y7VrgZ9olwz46/euY6CZsUfvLI0pvZ7+v6ziOF7GX9ynqu7n4Sj8Dt8Mhu1oq7xcAAAAASUVORK5CYII=');
	}

	button.streaks {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB9klEQVR4AWIgEowCQHXWQdxAEAMpGIIhZGqaG4OYgcPAZpAwMISbmvYNwkMwhINwEC7e6Rm5rBx90c0oxXWlVdnX51UzzbPqzSf4p+YuL6ro0oE8L9d5XqXj7+zOgSPwHYDD3DmQF8X7H/Cw5yo4Ay+s8QweFt2BF7YKE7/gYc/lxhV4tpCHb5W8pVFNWIBS26xYjUPbQB4AkN7aEeR9eZDAnLAgi9YRC0gdCcYRC1Te89a6Sx1pxa7H1KkSnx7lFhFm5kJ+aKZ9DKzADqr8XG9U71kUB2ikkRTu91rvNKzadxn9VwKEuOLC/8PXA995onT8RzjO1sMAeqdeGs2M1taBWbPVRV9IDsEeU0eW+d/IL+CvdfV1AKtiz6Kt2J9PwZ+bJDdasRUDSemAOMjrwWqB/LLm8hz5nA4m9tj2d22SYlDx4A03eXwXqV+uTPMJ8Vn2izA+f6t4jQWkBAncbhEGGg0pR0CCxgkKpF3UiFpYfapkuVUnagdiIfEoDVkw+7yZ0SzQtkEAvNaRemqjog0erBa4VEt9+LSV1ihAfLFB5BgHAo/MmolZuf2nxkqq6Ns7US/5GuBTsK90isytV6vCtW+v1ByoApF6hofP5XjjkiCKtLM+xHyIKDwta2Bs0Bt/WJ1cBy/SB6wF+Z4BDqjXALGO+C8rmNL37lsQGQAAAABJRU5ErkJggg==');
	}

	button.settings {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAgVBMVEUAAAD/QK//Par/Pa3/Pqz/Paz/Pqv/Pan/QK//Pa3/Pa3/Paz/Pqv/OK//PKv/Pa3/Pa3/QJ//Pq3/Pav/PK//PKz/Paz/Pa7/Oqr/Paz/Paz/Pa3/Paz/PK3/O63/Pqz/Pa3/O6z/QKf/Paz/Pqz/PKz/Pqv/PKv/Oq//OKf/Pasgm+6MAAAAK3RSTlMAEGCf37/PUCCP7/+AIEBw3xDfj29vUD8w799gr3+fX69fIJ/Pv6DPMCBw/vIlkwAAAZtJREFUeAGt1YW2pDAMBuAALRbouLvL+7/fCudmp0mbmbXvGC5/QgAhSTNjacXmWZHAO2VV4w8NdBr8KWtBkzT4xcEPDjv6Kb0aSX8AUA5fqwXEZPhi09TiywhixqiaQMwUVbN4RKiaQxRqFkoRalQsB8Cs1ptiTjFG5QNoXVo5duUa36i7vYuByP+jTAlH18ZvsNhudrvNfoEMlXwYZHKgUFITCdihMPIyPJ5QcFAhtwFmE+w+y4cU9shYqGRNhYTX5wKQ+lsOENgEfX6kLKiUXOLdn7r26t0w8HrL9a/LpSwiKQufN337KW6CE5Lz752wbqHjhmoVRCX6juYbsdpLkwbAom/waTbkojU2WkjkJlpj0X4YPiNwsrm4ZBiMtBqZE/iSKzLLSMfnrfc8Z+ROsn/Z/+DeoLB8UCWFfF1VmUEiQkxMd7LBNxb0Bp37aHcfUEdpo/I+m4wKkaDRh/H/Gfd3VMXv4FDl/v2nKEfWejarPv52p4ZVNPFWC4hKNtQlcz+ExWYAmmNlvM/oqR3OzEaXC3yxl80MhO8g0kQJwnzBJAAAAABJRU5ErkJggg==');
		background-position: right;
		flex-grow: 2.5;
	}

	div.indicator {
		width: 2.875em; /* 46px @ font-size 16px */
		height: 2.375em; /* 38px @ font-size 16px */
		z-index: 2;
		position: absolute;
		background-color: #ffffff;
		border-radius: 50%;
		box-shadow: 0px 4px 16px rgba(0, 0, 0, .25);
		z-index: 1;
		margin-top: 0;
		margin-bottom: 0;
		transition: transform .468s ease;
	}

	div.wallet {
		-webkit-transform: translateX(0%);
		transform: translateX(0%);
	}

	div.profile {
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}

	div.streaks {
		-webkit-transform: translateX(200%);
		transform: translateX(200%);
	}


	.current {
		filter: grayscale(1);
	}

	.selected {
		filter: none;
	}



</style>
