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

<style lang="stylus" src="styles.styl"></style>
