export const locales = ['en', 'me'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languages: Record<Locale, string> = {
	en: 'English',
	me: 'Crnogorski',
};
