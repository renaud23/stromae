import { fr } from '@codegouvfr/react-dsfr/fr';
import { useBannerLabel } from './useBannerLabel';

export function BannerAddress() {
	const bannerLabel = useBannerLabel();

	if (!bannerLabel) {
		return null;
	}
	return (
		<p className={fr.cx('fr-text--bold', 'fr-mr-2w', 'fr-mb-0')}>
			{bannerLabel}
		</p>
	);
}
