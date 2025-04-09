import { fr } from '@codegouvfr/react-dsfr';
import { BannerAddress } from './BannerAddress';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { PropsWithChildren } from 'react';

const useStyles = makeStyles()({
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

export function DraftBannerContainer({
	children,
	computedLabel,
}: PropsWithChildren<{ computedLabel: string }>) {
	const { classes, cx } = useStyles();
	return (
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
					<div
						className={cx(
							classes.badgeContainer,
							fr.cx(
								'fr-col-12',
								'fr-col-md-1',
								'fr-mr-1w',
								'fr-mb-1w',
								'fr-mb-md-0'
							)
						)}
					>
						{children}
					</div>
					<BannerAddress label={computedLabel as string} />
				</div>
				<p className={fr.cx('fr-col-12', 'fr-col-md-10', 'fr-mb-0')}>
					Vos réponses sont enregistrées automatiquement à chaque chargement de
					page.
				</p>
			</div>
		</div>
	);
}
