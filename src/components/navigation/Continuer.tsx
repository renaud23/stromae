import { useCallback, useState } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate, useParams } from 'react-router';
import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { ComponentType } from '../../typeLunatic/type-source';
import { CollectStatusEnum } from '../../typeStromae/type';
import { uri404 } from '../../lib/domainUri';
import { useLunaticContext } from '../orchestrator/useLunaticContext';
import { surveyApi } from '../../lib/surveys';

function getButtonTitle(getComponents: () => Array<ComponentType>) {
	if (getComponents) {
		const components = getComponents();
		return components.reduce((acc, component) => {
			if (component.componentType === 'Sequence') {
				return `Commencer la saise des questions concernant l'étape ${component.title}`;
			}
			return acc;
		}, `Passer à l'étape suivante`);
	}
	return `Passer à l'étape suivante`;
}

function getStatus(
	getComponents: () => Array<ComponentType>,
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
export function Continuer() {
	const { unit } = useParams();
	const [saving, setSaving] = useState(false);

	const {
		waiting = false,
		isLastPage,
		pageTag,
		getComponents,
		goNextPage,
	} = useLunaticContext();

	const navigate = useNavigate();

	const buttonContent =
		waiting || saving
			? `Chargement`
			: getStatus(getComponents, isLastPage ?? false, saving);

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();

			if (isLastPage && unit) {
				setSaving(true);
				surveyApi
					.putSurveyUnitStateData(
						{
							currentPage: pageTag,
							state: CollectStatusEnum.Validated,
							date: new Date().getTime(),
						},
						unit
					)
					.then(() => {
						navigate(0);
						setSaving(false);
					})
					.catch(() => {
						navigate(uri404());
						setSaving(false);
					});
			}

			window.scrollTo(0, 0);
			document.getElementById('button-precedent')?.focus();
			goNextPage();
		},
		[goNextPage, isLastPage, navigate, pageTag, unit]
	);

	return (
		<Button
			priority="primary"
			onClick={handleClick}
			title={getButtonTitle(getComponents)}
			nativeButtonProps={{
				form: 'stromae-form',
				type: 'submit',
				'aria-disabled': waiting || saving,
			}}
			id="continue-button"
			iconId={waiting || saving ? 'fr-icon-refresh-line' : undefined}
			disabled={waiting || saving}
		>
			{buttonContent}
		</Button>
	);
}
