import { fr } from '@codegouvfr/react-dsfr';
import { Tag } from '@codegouvfr/react-dsfr/Tag';
import { useStyles } from './DraftBannerContainer';
import { useLunaticContext } from '../orchestrator/useLunaticContext';
import { useEffect, useRef, useState } from 'react';

const duration = 1_500;

export function SavingBadge() {
	const { classes, cx } = useStyles();
	const { savingFailure } = useLunaticContext();
	const [saved, setSaved] = useState(false);

	const timer = useRef<ReturnType<typeof setTimeout>>();

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
				classes.badgeContainer,
				fr.cx('fr-col-12', 'fr-col-md-1', 'fr-mr-1w', 'fr-mb-1w', 'fr-mb-md-0')
			)}
		>
			{saved ? (
				<Tag iconId="fr-icon-refresh-line">Enregistrement...</Tag>
			) : (
				<Tag iconId="fr-icon-checkbox-circle-line">Brouillon enregistré</Tag>
			)}
		</div>
	);
}
