import { get, writable, derived } from 'svelte/store';

export const stackedScreen = writable(null);
export const mainScreen = writable('Profile');
export const mainTarget = writable('Profile');

export const mainClientWidth = writable(0);

export const currentScreen = derived([mainScreen, stackedScreen], ([$mainScreen, $stackedScreen]) => $stackedScreen ? $stackedScreen.name : $mainScreen);

// Initially I had wanted to include it as a method on a custom store, but if wasn't sure which store to do this with since
// navigate updates both mainTarget and stackedScreen, and I didn't want to combine them in to a store that returned an object containing
// both since they can be acted on independently of eachother.

export const navigate = screen => {
	let target = get(mainTarget);
	if (typeof screen === 'function') {
		mainScreen.update(mainScreen => target !== null ? target : mainScreen);
		stackedScreen.update(stackedScreen => stackedScreen === screen ? null : screen);
	} else if (typeof screen === 'string') {
		mainTarget.set(screen);
		stackedScreen.set(null);
	}
};
