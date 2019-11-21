module.exports = {
	preprocess: require('svelte-preprocess')(),
	stylus: {
		paths: ['src'],
		imports: 'styles/vars.styl'
	},
};
