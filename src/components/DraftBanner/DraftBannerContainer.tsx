import { fr } from '@codegouvfr/react-dsfr';

import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { PropsWithChildren } from 'react';

export const useStyles = makeStyles()({
	container: {
		borderBottom: '1px solid var(--border-default-grey)',
	},
	badgeContainer: {
		minWidth: 'fit-content',
	},
	addressRow: {
		'@media (min-width: 48em)': {
			flexDirection: 'row-reverse',
		},
	},
});

export function DraftBannerContainer({ children }: PropsWithChildren) {
	const { classes, cx } = useStyles();

	return (
		<div className="css-iiq5qy-container fr-col-12 fr-py-2w fr-mb-1w">
			<div className={fr.cx('fr-container')}>
				<div
					className={fr.cx(
						'fr-grid-row--no-gutters',
						'fr-grid-row',
						'fr-grid-row--middle'
					)}
				>
					<div
						className={cx(
							classes.addressRow,
							fr.cx(
								'fr-grid-row--no-gutters',
								'fr-grid-row',
								'fr-grid-row--middle'
							)
						)}
					>
						{children}
					</div>
					<p className={fr.cx('fr-col-12', 'fr-col-md-10', 'fr-mb-0')}>
						Vos réponses sont enregistrées automatiquement à chaque chargement
						de page.
					</p>
				</div>
			</div>
		</div>
	);
}
