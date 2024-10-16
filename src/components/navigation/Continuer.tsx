import { useCallback, useContext, useState } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CollectStatusEnum, LunaticInterface } from '../../typeStromae/type';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';
import { surveyAPI } from '../../lib/api/survey';
import { useNavigate } from 'react-router';
import { uri404, uriPostEnvoi } from '../../lib/domainUri';
import { defineCollectStatus } from '../../redux/appSlice';

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
export function Continuer() {
	const onSaving = useAppSelector((s) => s.stromae.onSaving);
	const currentPage = useAppSelector((s) => s.stromae.pageTag);
	const survey = useAppSelector((s) => s.stromae.survey);
	const unit = useAppSelector((s) => s.stromae.unit);
	const [saving, setSaving] = useState(false);
	const isLastPage = useAppSelector((s) => s.stromae.isLastPage);
	const navigate = useNavigate();
	const { getComponents, goNextPage } = useContext(LunaticContext);
	const dispatch = useAppDispatch();

	const buttonContent =
		saving || onSaving
			? `Chargement`
			: getStatus({ getComponents }, isLastPage ?? false, onSaving);

	const handleClick = useCallback(
		async (event: React.MouseEvent) => {
			event.preventDefault();
			if (isLastPage) {
				setSaving(true);
				const promise = dispatch(
					surveyAPI.endpoints.putStateData.initiate({
						unit,
						currentPage,
						state: CollectStatusEnum.Validated,
						date: new Date().getTime(),
					})
				);
				try {
					await promise;
					dispatch(defineCollectStatus(CollectStatusEnum.Validated));
					navigate(uriPostEnvoi(survey, unit));
				} catch (e) {
					navigate(uri404());
				} finally {
					setSaving(false);
				}
			}

			window.scrollTo(0, 0);
			document.getElementById('button-precedent')?.focus();
			goNextPage?.();
		},
		[dispatch, goNextPage, isLastPage, navigate, currentPage, survey, unit]
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
