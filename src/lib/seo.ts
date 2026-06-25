import { defaultLocale, locales, type Locale } from '../i18n/config';
import { getRouteUrl, type RouteId } from '../i18n/routes';

export const hreflangMap: Record<Locale, string> = {
	en: 'en',
	me: 'sr-ME',
};

export const ogLocaleMap: Record<Locale, string> = {
	en: 'en_US',
	me: 'sr_ME',
};

export function normalizeSiteUrl(site: URL | string | undefined): string {
	if (!site) return '';
	return site.toString().replace(/\/$/, '');
}

export function getPageUrl(siteUrl: string, locale: Locale, routeId: RouteId): string {
	return `${normalizeSiteUrl(siteUrl)}${getRouteUrl(locale, routeId)}`;
}

export function getAlternateLinks(siteUrl: string, routeId: RouteId) {
	const base = normalizeSiteUrl(siteUrl);

	return locales.map((locale) => ({
		hreflang: hreflangMap[locale],
		href: `${base}${getRouteUrl(locale, routeId)}`,
	}));
}

export function getDefaultAlternateHref(siteUrl: string, routeId: RouteId): string {
	return getPageUrl(siteUrl, defaultLocale, routeId);
}
