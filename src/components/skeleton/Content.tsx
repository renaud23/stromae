import { Skeleton } from '@mui/material';
import { fr } from '@codegouvfr/react-dsfr';

export function Content() {
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
