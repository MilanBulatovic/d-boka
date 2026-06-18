import en from './locales/en.json';
import me from './locales/me.json';
import { defaultLocale, locales, type Locale } from './config';

const translations = { en, me } as const;

export function getLocaleFromUrl(url: URL): Locale {
	const [, segment] = url.pathname.split('/');
	if (locales.includes(segment as Locale)) return segment as Locale;
	return defaultLocale;
}

export function getPathWithoutLocale(url: URL): string {
	const locale = getLocaleFromUrl(url);
	const pathname = url.pathname.replace(/\/$/, '') || '/';

	if (locale === defaultLocale) return pathname;

	const prefix = `/${locale}`;
	if (pathname === prefix) return '/';
	if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length) || '/';

	return pathname;
}

export function useTranslations(locale: Locale) {
	const dict = translations[locale] ?? translations[defaultLocale];

	return function t(key: string): string {
		const keys = key.split('.');
		let value: unknown = dict;

		for (const part of keys) {
			if (value && typeof value === 'object' && part in value) {
				value = (value as Record<string, unknown>)[part];
			} else {
				return key;
			}
		}

		return typeof value === 'string' ? value : key;
	};
}
