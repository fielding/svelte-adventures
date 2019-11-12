<script>
	import AccountScreen from '../Screen.svelte';
	import Balance from '../Balance.svelte';
	import Change from '../Change.svelte';
</script>

<AccountScreen swipeable>
	<h2 slot="title" class="title"><span style="color: #655197;">@</span>Luke<span style="color: rgba(255, 61, 172);">Polka</span></h2>
	<div class="card">
		<img class="avatar" alt="User's Avatar" src="https://i.imgur.com/lrqk90Q.png" >
		<div class="balance">
			<i></i>2<span>kb</span>
		</div>
		<div class="change">
			<em>~90 LOC (35-50% faster)</em>
			<span></span>
		</div>
		<p class="quote">
			"&lt;insert trending framework&gt; used to good, but then they went and got popular!" - <span style="font-style: normal; color: #ff3dac;">Luke 'Hipster' Polka</span>
		</p>
	</div>
	<div class="promos">
		<a class="banner" href="https://github.com/lukeed/polka" style="text-decoration: none;">
			<h2>Ladies...  </h2>
			<p>my web server so fast, <br /> it'll make you dance!</p>
			<!-- <span class="index">1/254</span> -->
		</a>
	</div>
</AccountScreen>

<style src="./Settings.scss"></style>
