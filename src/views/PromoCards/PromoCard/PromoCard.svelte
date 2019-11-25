<script>
import { navigate } from '~/views/Account/store.js';
export let title, body, index, screen, total;


</script>


<div class="card" on:click={() => navigate(screen)}>
	<h2>{title}</h2>
	<p>{body}</p>
	<span class="index">{index + 1}/{total}</span>
</div>


<style lang="stylus" src="styles.styl"></style>
