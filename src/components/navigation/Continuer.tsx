import { useCallback, useContext } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { ComponentType } from '../../typeLunatic/type-source';

import { useAppSelector } from '../../redux/store';
import { LunaticInterface, OrchestratedElement } from '../../typeStromae/type';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';

type GetComponents = Pick<LunaticInterface, 'getComponents'>;

function getButtonTitle({ getComponents }: GetComponents) {
	if (getComponents) {
		const components = getComponents();
		return components?.reduce((acc, component) => {
			if (component.componentType === 'Sequence') {
				return `Commencer la saise des questions concernant l'étape ${component.title}`;
			}
			return acc;
		}, `Passer à l'étape suivante`);
	}
	return `Passer à l'étape suivante`;
}

function getStatus(
	{ getComponents }: GetComponents,
	isLastPage: boolean,
	saving: boolean
) {
	if (isLastPage) {
		return 'Valider mes réponses';
	}
	if (saving) {
		return 'Vos données sont en cours de sauvegarde';
	}
	if (getComponents) {
		const components = getComponents();
		if (isComponentsContainSequence(components)) {
			return 'Commencer';
		}
	}
	return 'Continuer';
}

/**
 * Le bouton de navigation en bas de page sur le questionnaire.
 * @param props
 * @returns
 */
export function Continuer(props: OrchestratedElement) {
	const onSaving = useAppSelector((s) => s.stromae.onSaving);
	const isLastPage = useAppSelector((s) => s.stromae.isLastPage);
	const { getComponents, goNextPage } = useContext(LunaticContext);

	const buttonContent = onSaving
		? `Chargement`
		: getStatus({ getComponents }, isLastPage ?? false, onSaving);

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();

			// if (isLastPage) {
			// 	setSaving(true);
			// 	saveSuData({
			// 		pageTag,
			// 		collectStatus: CollectStatusEnum.Validated,
			// 	})
			// 		.then(() => {
			// 			navigate(uriPostEnvoi(survey, unit));
			// 			setSaving(false);
			// 		})
			// 		.catch(() => {
			// 			navigate(uri404());
			// 			setSaving(false);
			// 		});
			// }

			window.scrollTo(0, 0);
			document.getElementById('button-precedent')?.focus();
			goNextPage?.();
		},
		[goNextPage]
	);

	return (
		<Button
			priority="primary"
			onClick={handleClick}
			title={getButtonTitle({ getComponents })}
			nativeButtonProps={{
				form: 'stromae-form',
				type: 'submit',
				'aria-disabled': onSaving,
			}}
			id="continue-button"
			iconId={onSaving ? 'fr-icon-refresh-line' : undefined}
			disabled={onSaving}
		>
			{buttonContent}
		</Button>
	);
}
