import { PersonalizationElement } from '../../../Stromae/src/typeStromae/type';

export function createPersonalizationMap(
	personalization: Array<PersonalizationElement>
): Record<
	string | 'bannerLabel' | 'bannerLabelDependencies',
	string | number | boolean | Array<string>
> {
	return personalization.reduce((acc, { name, value }) => {
		return { ...acc, [name]: value };
	}, {});
}
