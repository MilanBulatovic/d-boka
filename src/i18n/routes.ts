import { defaultLocale, type Locale } from './config';
import { getLocaleFromUrl, getPathWithoutLocale } from './utils';

export const routes = {
	home: { en: '', me: 'pocetna' },
	about: { en: 'about', me: 'o-nama' },
	contact: { en: 'contact', me: 'kontakt' },
	building1: { en: 'building-1', me: 'zgrada-1' },
	building2: { en: 'building-2', me: 'zgrada-2' },
} as const;

export type RouteId = keyof typeof routes;

export function getRouteSegment(routeId: RouteId, locale: Locale): string | undefined {
	const segment = routes[routeId][locale];
	return segment || undefined;
}

export function getRouteUrl(locale: Locale, routeId: RouteId): string {
	const segment = getRouteSegment(routeId, locale);

	if (locale === defaultLocale) {
		return segment ? `/${segment}` : '/';
	}

	return segment ? `/me/${segment}` : '/me/pocetna';
}

export type RouteFromUrl = {
	routeId: RouteId;
	subpath?: string;
};

export function getRouteFromUrl(url: URL): RouteFromUrl {
	const locale = getLocaleFromUrl(url);
	const path = getPathWithoutLocale(url);
	const segment = path === '/' ? '' : path.replace(/^\//, '');

	if (!segment) return { routeId: 'home' };

	for (const routeId of Object.keys(routes) as RouteId[]) {
		const routeSegment = routes[routeId][locale];
		if (!routeSegment) continue;

		if (segment === routeSegment) {
			return { routeId };
		}

		if (segment.startsWith(`${routeSegment}/`)) {
			return {
				routeId,
				subpath: segment.slice(routeSegment.length + 1),
			};
		}
	}

	return { routeId: 'home' };
}

export function getLocalizedUrl(url: URL, targetLocale: Locale): string {
	const { routeId, subpath } = getRouteFromUrl(url);
	const base = getRouteUrl(targetLocale, routeId);

	return subpath ? `${base}/${subpath}` : base;
}

export function getRouteIdFromUrl(url: URL): RouteId {
	return getRouteFromUrl(url).routeId;
}
