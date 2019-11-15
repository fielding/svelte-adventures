<script>
import { navigate } from '~/views/Account/store.js';
export let title, body, index, screen, total;


</script>


<div class="card" on:click={() => navigate(screen)}>
	<h2>{title}</h2>
	<p>{body}</p>
	<span class="index">{index + 1}/{total}</span>
</div>


<style>
	.card {
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
		margin: 0 .59375em 0 .59375em;
  	position: relative;
  	font-weight: 500;
  	scroll-snap-align: center;
  	cursor: pointer;
	}

	.card:nth-of-type(1n + 1) {
    background: linear-gradient(0deg, rgba(255, 61, 172, .85), rgba(255, 61, 172, .85)), url($img-bg-friend-bonus) right center, #6B94FF;
  }

  .card:nth-of-type(2n + 1) {
    background: linear-gradient(0deg, rgba(239, 167, 60, .85), rgba(239, 167, 60, .85)), url($img-bg-friend-bonus) right center, #6B94FF;
  }

  .card:nth-of-type(3n + 1) {
    background: linear-gradient(0deg, rgba(135, 61, 255, .85), rgba(135, 61, 255, .85)), url($img-bg-friend-bonus) right center, #6B94FF;
  }

  .card:nth-of-type(4n + 1) {
    background: linear-gradient(0deg, rgba(61, 150, 255, .85), rgba(61, 150, 255, .85)), url($img-bg-friend-bonus) right center, #6B94FF;
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
</style>
