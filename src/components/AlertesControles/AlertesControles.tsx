import { useEffect, ReactNode, useState, useContext } from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { ComponentType } from '../../typeLunatic/type-source';
import { useAppSelector } from '../../redux/store';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';

function ErrorMessage({ errorMessage }: { errorMessage: ReactNode }) {
	if (errorMessage && Array.isArray(errorMessage)) {
		return (
			<>
				{errorMessage.map((message, i) => {
					return <p key={i}>{message}</p>;
				})}
			</>
		);
	}
	return <>{errorMessage}</>;
}

function checkIfIsRoundAbout(components?: ComponentType[]) {
	if (Array.isArray(components)) {
		return components.reduce(
			(status, { componentType }) => status || componentType === 'Roundabout',
			false
		);
	}
	return true;
}

export function AlertesControles() {
	const currentErrors = useAppSelector((s) => s.stromae.currentErrors);
	const isCritical = useAppSelector((s) => s.stromae.isCritical);
	const { getComponents } = useContext(LunaticContext);
	const type = isCritical ? 'fr-alert--error' : 'fr-alert--warning';
	const [isInRoundabout, setIsRoundabout] = useState(false);

	useEffect(() => {
		if (currentErrors) {
			document.getElementById('alert-errors')?.focus();
		}
	}, [currentErrors]);

	useEffect(() => {
		const components = getComponents?.();
		setIsRoundabout(checkIfIsRoundAbout(components));
	}, [getComponents]);

	if (currentErrors && isInRoundabout) {
		const content = Object.values(currentErrors)
			.flat()
			.map(({ errorMessage, id }) => {
				return (
					<div key={id} className="message-error" id="alertText">
						<ErrorMessage errorMessage={errorMessage} />
					</div>
				);
			});

		return (
			<div
				aria-labelledby="alertHeading"
				aria-describedby="alertText"
				id="alert-errors"
				className={fr.cx('fr-alert', type, 'fr-mb-3w')}
				role="alert"
				tabIndex={-1}
			>
				<h3 id="alertHeading" className={fr.cx('fr-alert__title')}>
					Il y a un problème
				</h3>
				{content}
			</div>
		);
	}
	return null;
}
