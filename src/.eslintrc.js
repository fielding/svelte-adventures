module.exports = {
	env: {
		es6: true,
		browser: true,
		jest: true,
	},
	"globals": {
		"VIDY_API": "readonly",
		"VIDY_STATIC": "readonly",
		"VIDY_RELEASE": "readonly",
		"VIDY_DASHBOARD": "readonly",
		"VIDY_IFRAME": "readonly"
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 2019,
	},
	extends: [
		'plugin:vue/essential',
		'plugin:prettier/recommended',
		'prettier/@typescript-eslint',
		'plugin:@typescript-eslint/recommended',
		'plugin:jest/all'
	],
	plugins: [
		'@typescript-eslint',
		'prettier',
		'svelte3',
		'jest'
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				'import/first': 0,
				'import/no-duplicates': 0,
				'import/no-mutable-exports': 0,
				'import/no-unresolved': 0
			},
		},
	],
	rules: {
		"@typescript-eslint/camelcase": 0,
		"@typescript-eslint/ban-ts-ignore": 1,
		"@typescript-eslint/no-unused-vars": 2,
		"@typescript-eslint/no-use-before-define": 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/member-delimiter-style': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/indent': [2, "tab"],
		"quotes": [2, "single", { avoidEscape: true }],
		'import/no-extraneous-dependencies': 0,
		"jest/prefer-expect-assertions": 1,
		"linebreak-style": [1, "unix"],
		"semi": [2, 'always'],
		"no-shadow": "warn",
		"no-var": 2,
		"prefer-rest-params": 0,
		"object-curly-spacing": [2, "always"],
		"prefer-const": [2, { "destructuring": "all" }],
		"space-in-parens": 2,
		"keyword-spacing": 2,
		"spaced-comment": 2,
		"arrow-spacing": 2,
		"semi-spacing": 2
	},
	settings: {
		'import/core-modules': 'svelte',
	},
};
