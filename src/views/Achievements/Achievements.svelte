<script>
  // TODO:
  // 1. address non semantic markup used here when this is actually being implemented.
	// 2. remove tribute 'make benefit for glorious nation Garretstan'
	// 3. extract svg elements out once I figure out how I want to handle icons (svgs for that matter as well)
	import AccountScreen from "~/views/AccountScreen/AccountScreen.svelte";
	import VidyCurrencyDisplay from '~/components/VidyCurrencyDisplay/VidyCurrencyDisplay.svelte';
</script>

<AccountScreen swipeable>
  <h2 slot="title" class="title">Achievements</h2>
	<VidyCurrencyDisplay type="points" amount="550" />
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
