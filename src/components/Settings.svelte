<script>
	import AccountScreen from './Screen.svelte';
	import Balance from './Balance.svelte';
	import Change from './Change.svelte';
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

<style>
	.card {
		/* background-image: radial-gradient(#212121 20%, transparent 20%),
      radial-gradient(#e53935 20%, transparent 20%);
 	 	background-color: #ffffff;
  	background-position: 0 0, 50px 50px;
		 background-size: 100px 100px; */
		background:
			radial-gradient(rgba(255, 61, 172) 2px, transparent 3px),
			radial-gradient(#655197 2px, transparent 3px),
			#fff;
    background-position: 0 0, 20px 20px;
    background-size: 40px 40px;
		box-shadow: 0px 10px 42px rgba(0, 0, 0, .128);
		border-radius: .5em; /* 8px @ 16px */
		max-width: 336px;
		height: 24.25em; /* 388px height at 16px font-size */
		left: 0;
		right: 0;
		margin: 4.5em 1.1875em 0 1.1875em; /* 72px auto 0 auto @ font-size 16px */
	}

	.avatar {
		border-radius: 50%;
		border: .375em solid #ffffff;
		background-color: #ffffff;
		height: 14.375em; /* 230px at 16px font-size */
		width: 14.375em;
		margin-top: -3em; /* -48px @ 16px font-size */
		border: .375em solid #ffffff; /* 6px solid $white @ 16px font-size */
		background-color: #ffffff;
	}

	.title {
		font-weight: 500;
    font-size: 1.125em; /* 18px with parent font-size 16px */
    color: #ffffff;
    text-transform: initial;
    margin-top: 1em; /* same as this elements font-size */
    margin-bottom: 1em;
	}

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

	.banner {
	  max-width: 21em;
  	min-width: 100%;
		height: 5.375em; /* 86px @ font-size 16px */
  	box-shadow: 0px 10px 42px rgba(0, 0, 0, .128);
  	border-radius: 8px;
  	flex: 1 1 21em;
  	left: 0;
  	right: 0;
  	color: #ffffff;;
  	padding: .75em 1.625em .75em 1.625em; /* 12px 26px 12px 26px @ font-size 16px */
		margin: 0 .59375em 0 0;
  	position: relative;
  	font-weight: 500;
  	scroll-snap-align: center;
  	cursor: pointer;
		background: url(https://raw.githubusercontent.com/lukeed/polka/master/polka.png) left center, url(https://raw.githubusercontent.com/lukeed/polka/master/polka.png) right center, #655197;
		background-size: auto 90%;
		background-repeat: no-repeat;
	}

	 .balance {
		line-height: 1.25;
		/* font-size: 1.5em; */
		font-size: 2.25em;
		font-weight: 700;
		color: #2b2b2b;
		text-transform: initial;
		/* margin-top: .416em; */
	}

	i {
		display: inline-block;
		width: .667em;
		height: .667em;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url(https://github.githubassets.com/images/icons/emoji/neckbeard.png);
		margin-right: .0833em;
	}

	.balance span {
		color: #2b2b2b;
		font-size: .667em;
		line-height: 1.2;
	}
	h2 {
		font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-weight: 700;
		font-size: 1.125em; /* 18px @ 16px */
		line-height: 1.285; /* ~27px with 21px font-size */
		margin: 0;
	}

	p {
		font-size: .8125em; /* 13px */
		line-height: 1.385; /* ~18px line-height @ 13px font-size */
		margin: 0;
	}

	.index {
		display: inline-block;
		position: absolute;
		left: .75em; /* 12px @ font-size 16px */
		bottom: .125em; /* 2px @ font-size 16px */
	}
	.change {
		line-height: .75; /* 12px */
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom:1em;
	}

	em {
		font-size: .875em; /* 14px */
		line-height: 1.214; /* ~17px */
		color: #655197;
		font-style: unset;
		background-color: #fff8
	}

	.quote {
		font-size: 1em;
		font-weight: bold;
		font-style: italic;
		background-color:#fff8;
		display: inline;
		color:#222;
	}

</style>
