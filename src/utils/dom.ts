// TODO: actually utilize typescript here
// Mimic scrollTo with `scroll-behavior: smooth` for browsers with out support for `scroll-behavior`.
// (IE, safari and safari mobile).
export function smoothHorizontalScroll(element:HTMLElement, xDelta:number) {
	const now = window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now;
	const ease = (k:number) => 0.5 * (1 - Math.cos(Math.PI * k));
	const scrollStep = (el:HTMLElement, startTime:number, initialX:number, x:number) => {
			let elapsed = (now() - startTime) / 468; // magic number wha?

		// floor elapsed times greater than 1
		elapsed = elapsed > 1 ? 1 : elapsed;

		let currentX = initialX + (x - initialX) * ease(elapsed);
		el.scrollLeft = currentX;

		// recursively call self if we have not scrolled enough
		if (currentX !== x) {
			window.requestAnimationFrame(scrollStep.bind(window, el, startTime, initialX, x));
		}
	};

	scrollStep(element, now(), element.scrollLeft, xDelta);
}

