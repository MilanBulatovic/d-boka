type WindowWithSmooth = Window & {
	__smoothScroll?: {
		lenis?: {
			scrollTo: (target: number, options?: { immediate?: boolean; force?: boolean }) => void;
		};
	};
	__scrollToTopHooks?: Set<string>;
};

export function scrollPageToTop(pageSelector: string) {
	if (!document.querySelector(pageSelector)) return;

	window.scrollTo(0, 0);

	const lenis = (window as WindowWithSmooth).__smoothScroll?.lenis;
	lenis?.scrollTo(0, { immediate: true, force: true });
}

export function scheduleScrollPageToTop(pageSelector: string) {
	scrollPageToTop(pageSelector);
	requestAnimationFrame(() => {
		scrollPageToTop(pageSelector);
		requestAnimationFrame(() => scrollPageToTop(pageSelector));
	});
}

export function initScrollPageToTop(pageSelector: string) {
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

	const run = () => scheduleScrollPageToTop(pageSelector);
	const win = window as WindowWithSmooth;

	run();

	if (!win.__scrollToTopHooks) win.__scrollToTopHooks = new Set();
	if (win.__scrollToTopHooks.has(pageSelector)) return;

	win.__scrollToTopHooks.add(pageSelector);
	document.addEventListener('astro:after-swap', run);
	document.addEventListener('astro:page-load', run);
}
