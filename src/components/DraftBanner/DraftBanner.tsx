import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { Tag } from '@codegouvfr/react-dsfr/Tag';
import { fr } from '@codegouvfr/react-dsfr';
import { BannerAddress } from './BannerAddress';
import { useAppSelector } from '../../redux/store';
import { useGetSurveyUnitQuery } from '../../lib/api/survey';
import { createPersonalizationMap } from '../../utils/createPersonlizationMap';

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

// TODO utiliser un remote component pour obtenir le label plutôt que tout refetch
// Partie spécifique RP.

export function DraftBanner() {
	const savingFailure = useAppSelector((s) => s.stromae.savingFailure);
	const unit = useAppSelector((s) => s.stromae.unit);

	const { classes, cx } = useStyles();
	// saved is used as a flag to display the save message
	const [saved, setSaved] = useState(false);
	const [label, setLabel] = useState('');
	const [refetch, setReftech] = useState(false);

	const timer = useRef<ReturnType<typeof setTimeout>>();
	const duration = 1_500;

	const { data: surveyUnitData, isSuccess } = useGetSurveyUnitQuery(unit, {
		refetchOnMountOrArgChange: refetch,
	});

	useEffect(() => {
		if (isSuccess) {
			if (surveyUnitData?.personalization) {
				const personalization = createPersonalizationMap(
					surveyUnitData?.personalization ?? ''
				);
				setLabel(`${personalization?.bannerLabel}` ?? '');
				setReftech(false);
			}
		}
	}, [isSuccess, surveyUnitData?.personalization]);

	useEffect(() => {
		if (savingFailure?.status !== 200) {
			return;
		}
		if (timer.current) {
			// clear previous duration
			clearTimeout(timer.current);
		}
		setSaved(true);
		timer.current = setTimeout(() => {
			setSaved(false);
		}, duration);
	}, [savingFailure]);

	useEffect(() => {
		// clear timer when component is unmounted
		return () => clearTimeout(timer.current);
	}, []);

	return (
		<div
			className={cx(
				classes.container,
				fr.cx('fr-col-12', 'fr-py-2w', 'fr-mb-1w')
			)}
		>
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
							{saved ? (
								<Tag iconId="fr-icon-refresh-line">Enregistrement...</Tag>
							) : (
								<Tag iconId="fr-icon-checkbox-circle-line">
									Brouillon enregistré
								</Tag>
							)}
						</div>
						<BannerAddress label={label} />
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
