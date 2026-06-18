import { defaultLocale, type Locale } from './config';
import { getLocaleFromUrl, getPathWithoutLocale } from './utils';

export const routes = {
	home: { en: '', me: 'pocetna' },
	about: { en: 'about', me: 'o-nama' },
	contact: { en: 'contact', me: 'kontakt' },
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

export function getRouteIdFromUrl(url: URL): RouteId {
	const locale = getLocaleFromUrl(url);
	const path = getPathWithoutLocale(url);
	const segment = path === '/' ? '' : path.replace(/^\//, '');

	if (!segment) return 'home';

	for (const routeId of Object.keys(routes) as RouteId[]) {
		if (routes[routeId][locale] === segment) return routeId;
	}

	return 'home';
}
