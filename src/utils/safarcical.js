/**
 * @fileoverview utility functions to tame mobile safari's farcical behavior
 */

const styleNames = ['height', 'overflow-y', '-webkit-overflow-scrolling'];
const existingStyles = {};
let instances = [];
let tapStartTime = 0;
let initY;
let tolerance;

const handleTouchStart = event => {
	initY = event.changedTouches[0].clientY;
};

const handleTouchMove = event => {
	let availableScrollDown = 0;
	let availableScrollUp = 0;
	let delta = initY - event.changedTouches[0].clientY;
	let target = event.target;

	do {
		if (window.getComputedStyle(target).overflowY !== 'hidden') {
			availableScrollDown += target.scrollHeight - target.clientHeight - target.scrollTop;
			availableScrollUp += target.scrollTop;
		}
		target = target.parentNode;
	} while (instances.some(n => n.contains(target)));

	if ((delta > 0 && delta > availableScrollDown + tolerance) || (delta < 0 && -delta > availableScrollUp - tolerance)) {
		event.preventDefault();
		event.stopPropagation();
	}
};

const attachScrollLockHandlers = () => {
	addEventListener('touchstart', handleTouchStart, { passive: false });
	addEventListener('touchmove', handleTouchMove, { passive: false });
};

const detachScrollLockHandlers = () => {
	removeEventListener('touchstart', handleTouchStart, { passive: false });
	removeEventListener('touchmove', handleTouchMove, { passive: false });
};

const saveExistingStyles = nodes => {
	nodes.forEach(node => {
		if (existingStyles[node.localName] === undefined) existingStyles[node.localName] = {};
		styleNames.forEach(style => {
			existingStyles[node.localName][style] = node.style[style];
		});
	});
};

const toggleActionBar = lock => {
	[document.querySelector('html'), document.body].forEach(node => {
		node.style.height = lock ? '100%' : existingStyles[node.localName].height;
		node.style.overflowY = lock ? 'hidden' : existingStyles[node.localName].overflowY;
		node.style['-webkit-overflow-scrolling'] = lock ? 'touch' : existingStyles[node.localName]['-webkit-overflow-scrolling'];
	});
};

const preventSecondTap = event => {
	let now = Date.now();
	const isInteractive = window.getComputedStyle(event.target).getPropertyValue('touch-action') === 'manipulation';

	if (tapStartTime + 300 >= now && !isInteractive) {
		event.preventDefault();
	}

	tapStartTime = now;
};

/**
 * Prevent touch scrolling outside of the target node and it's children
 * @param {Node} node container node for scrollable nodes
 * @param {Object} [options] options object
 * @param {number} [options.tolerance = 0] tolerance of touch point Y coordinate
 * 		This allows swipe gestures that are not perfectly horizontal
 * @public
 */
export const lockScroll = (node, options = {}) => {
	tolerance = options.tolerance || 0;
	if (instances.length === 0) attachScrollLockHandlers();
	instances.push(node);
};

/**
 * Restore touch scrolling outside of the target node and it's children
 * @param {Node} node - container node that the initial lock was applied to
 * @public
 */
export const unlockScroll = node => {
	instances = instances.filter(n => n !== node);
	if (instances.length === 0) detachScrollLockHandlers();
};

/**
 * Lock mobile safari's 'action bar' to a visible state
 * @public
 */
export const lockActionBar = () => {
	saveExistingStyles([document.querySelector('html'), document.body]);
	toggleActionBar(true);
};

/**
 * Unlock mobile safari's 'action bar' and allow it to hide
 * @public
 */
export const unlockActionBar = () => {
	toggleActionBar(false);
};

/**
 * Disable double tap, or more specifically, any successive tap within 300ms of another unless the target
 * element has the css property 'touch-action' set to manipulation. This allows for buttons and other block level
 * elements with this css property to respond to double taps, while the rest of the page, and more specifically inline
 * elements where the 'touch-action' property has no effect, to ignore double taps.
 * Note: Currently being utilized to prevent zooming via double tap
 * @public
 */
export const disableDoubleTap = () => {
	addEventListener('touchend', preventSecondTap, { passive: false });
};

/**
 * Removes listener that disables double taps.
 * @public
 */
export const enableDoubleTap = () => {
	removeEventListener('touchend', preventSecondTap, { passive: false });
};
