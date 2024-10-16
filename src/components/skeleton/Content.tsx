import { Skeleton } from '@mui/material';

import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { fr } from '@codegouvfr/react-dsfr';
import { useMetadata } from '../../hooks/useMetadata';

export function Content() {
	const metadata = useMetadata();
	useDocumentTitle('Page de chargement', metadata);
	return (
		<div className={fr.cx('fr-container')} aria-live="polite" aria-busy="true">
			<div
				className={fr.cx(
					'fr-col-lg-6',
					'fr-col-12',
					'fr-my-6w',
					'fr-my-md-12w'
				)}
			>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		</div>
	);
}
