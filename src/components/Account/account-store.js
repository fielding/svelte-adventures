import { writable, derived} from 'svelte/store';

export const stackedScreen = writable(null);
export const mainScreen = writable('Profile');
export const mainTarget = writable(null);

export const mainClientWidth = writable(0);

export const currentScreen = derived([mainScreen, stackedScreen], ([$mainScreen, $stackedScreen]) => $stackedScreen ? $stackedScreen.name : $mainScreen);
