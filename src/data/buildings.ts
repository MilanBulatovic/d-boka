import building1Image from '../assets/b1.webp';
import building2Image from '../assets/b2.webp';
import type { RouteId } from '../i18n/routes';

export type BuildingId = 'building1' | 'building2';

export type BuildingEntry = {
	id: BuildingId;
	routeId: RouteId;
	image: ImageMetadata;
	translationKey: BuildingId;
};

export const buildings: ReadonlyArray<BuildingEntry> = [
	{
		id: 'building1',
		routeId: 'building1',
		image: building1Image,
		translationKey: 'building1',
	},
	{
		id: 'building2',
		routeId: 'building2',
		image: building2Image,
		translationKey: 'building2',
	},
];
