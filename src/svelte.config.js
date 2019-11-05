/**
 * Reusable config for rollup & `svelte-vscode` extension.
 * By default, everything is already hooked up w/ default options:
 * @see https://github.com/kaisermann/svelte-preprocess#options
 * @see https://marketplace.visualstudio.com/items?itemName=JamesBirtles.svelte-vscode
 */
const preprocessor = require('svelte-preprocess');

module.exports = {
  // @ts-ignore – wrong `.d.ts` export
  preprocess: preprocessor(),
};
