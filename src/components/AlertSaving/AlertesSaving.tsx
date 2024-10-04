import { Alert } from '@codegouvfr/react-dsfr/Alert';

import { fr } from '@codegouvfr/react-dsfr/fr';
import { useAppSelector } from '../../redux/store';

export function AlertesSaving() {
	const savingFailure = useAppSelector((s) => s.stromae.savingFailure);
	if (savingFailure) {
		const { status } = savingFailure;
		if (status === 500) {
			return (
				<Alert
					className={fr.cx('fr-mb-3w')}
					closable
					description="Vos données n'ont pu être sauvegardées, veuillez réessayer ou contacter l'assistance."
					severity="error"
					title="Une erreur est survenue lors de la sauvegarde de vos données"
				/>
			);
		}
	}
	return null;
}
