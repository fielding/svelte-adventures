<script>
  // TODO:
  // 1. address non semantic markup used here when this is actually being implemented.
	// 2. remove tribute 'make benefit for glorious nation Garretstan'
	// 3. extract svg elements out once I figure out how I want to handle icons (svgs for that matter as well)
  import AccountScreen from "~/views/AccountScreen/AccountScreen.svelte";
</script>

<AccountScreen swipeable>
  <h2 slot="title" class="title">Achievements</h2>
  <h2 class="points">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
			<path class="circle" d="M24 48c13.2548 0 24-10.7452 24-24S37.2548 0 24 0 0 10.7452 0 24s10.7452 24 24 24z"/>
			<path d="M36.3897 15.1657l-8.623 20.7188h-7.5605l-8.5984-20.7188h7.5112l5.0157 12.637 5.2875-12.637h6.9675z"/>
			<path d="M29.1898 24.0637h6.2301v4.3106h-6.2301v-4.3106zM12.5772 24.0637h5.8148v4.3106h-5.8148v-4.3106z"/>
		</svg>
		550
  </h2>
  <h5>Total Earned</h5>
  <div class="grid">
    {#each Array(24).fill('yeah buddy') as reward}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M36 20v-8c0-6.626-5.374-12-12-12S12 5.374 12 12v8H6v28h36V20h-6zM26
          35.446V40h-4v-4.554c-1.19-.694-2-1.968-2-3.446 0-2.208 1.792-4 4-4s4
          1.792 4 4c0 1.476-.808 2.752-2 3.446zM16 20v-8c0-4.412 3.588-8 8-8
          4.41 0 8 3.588 8 8v8H16z" />
      </svg>
    {/each}
  </div>
  <div class="gloriousNationGarrettstan">
    <img alt="Comrade Garrett" src="https://i.imgur.com/8HK8n46.png" />
  </div>
</AccountScreen>

<style lang="scss">
  h5 {
    margin: 0;
    color: #ffffff;
    font-size: 0.6875em;
	}

  .title {
    font-weight: 500;
    font-size: 1.125em; /* 18px with parent font-size 16px */
    color: #ffffff;
    text-transform: initial;
    margin-top: 1em; /* same as this elements font-size */
    margin-bottom: 1em;
  }

  .points {
    margin: 1em 0 0 0;
    color: #ffffff;
		font-size: 1.5em;
    svg {
      display: inline-block;
      width: 0.70em;
			height: 0.70em;
			margin-right: -.125em;
			fill: #ffffff;

			.circle {
				fill: #ff3dac;
			}
		}
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 3.25em;
    padding: 2.4375em 3.25em;
		justify-items: center;

		svg {
			width: 1.625em;
			height: 1.625em;
			fill: #ffffff;
			//garretstan .balance
			position: relative;
			z-index: 1;
			pointer-events: none;
		}
  }

  .gloriousNationGarrettstan {
    height: 630px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;

    img {
      width: 100%;
      filter: sepia(0.66);
      opacity: 0.66;
      transition: opacity 0.7s ease, filter 0.7s ease;

      &:hover {
        filter: unset;
        opacity: 1;
      }
    }
  }
</style>
