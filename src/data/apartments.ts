import apartmentsEn from './apartments.en.json';
import apartmentsMe from './apartments.me.json';
import type { BuildingId } from './buildings';
import { getRouteUrl } from '../i18n/routes';
import type { Locale } from '../i18n/config';

export type ApartmentFloor =
	| 'groundFloor'
	| 'firstFloor'
	| 'secondFloor'
	| 'penthouse'
	| 'gardenLevel';

export type Apartment = {
	id: string;
	buildingId: BuildingId;
	buildingNumber: 1 | 2;
	title: string;
	description: string;
	imageUrl: string;
	beforeImage?: string;
	afterImage?: string;
	floor: ApartmentFloor;
	bedrooms: number;
	tags: string[];
	options: string[];
	planImage?: string;
	sold?: boolean;
};

type ApartmentInput = Omit<Apartment, 'id'> & { id?: string };

function getApartmentId(imageUrl: string, id?: string): string {
	if (id) return id;
	const match = imageUrl.match(/\/([^/.]+)\./);
	return match?.[1] ?? imageUrl;
}

function normalizeApartment(apartment: ApartmentInput): Apartment {
	return {
		...apartment,
		id: getApartmentId(apartment.imageUrl, apartment.id),
	};
}

const apartmentsByLocale: Record<Locale, Apartment[]> = {
	en: (apartmentsEn.apartments as ApartmentInput[]).map(normalizeApartment),
	me: (apartmentsMe.apartments as ApartmentInput[]).map(normalizeApartment),
};

export function getApartments(locale: Locale): Apartment[] {
	return apartmentsByLocale[locale] ?? apartmentsByLocale.en;
}

export function getBuildingApartments(locale: Locale, buildingId: BuildingId): Apartment[] {
	return getApartments(locale).filter((apartment) => apartment.buildingId === buildingId);
}

export function getApartmentById(
	locale: Locale,
	buildingId: BuildingId,
	apartmentId: string,
): Apartment | undefined {
	return getBuildingApartments(locale, buildingId).find((apartment) => apartment.id === apartmentId);
}

export function getApartmentUrl(locale: Locale, buildingId: BuildingId, apartmentId: string): string {
	const buildingRouteId = buildingId === 'building1' ? 'building1' : 'building2';
	return `${getRouteUrl(locale, buildingRouteId)}/${apartmentId}`;
}
