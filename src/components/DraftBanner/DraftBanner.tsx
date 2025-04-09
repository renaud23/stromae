import { useState, useEffect, useRef } from 'react';
import { Tag } from '@codegouvfr/react-dsfr/Tag';
import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { createPersonalizationMap } from '../orchestrator/useOrchestrator';
import { useLunaticContext } from '../orchestrator/useLunaticContext';
import { DraftBannerContainer } from './DraftBannerContainer';
import { surveyApi } from '../../lib/surveys';
import { useParams } from 'react-router';

// checks if the list of bannerLabelDependencies includes a value that just changed
function dependenciesHaveChanged(
	currentChange?: { name: string },
	bannerLabelDependencies?: string | number | boolean | Array<string>
) {
	if (
		!currentChange ||
		!bannerLabelDependencies ||
		!Array.isArray(bannerLabelDependencies)
	) {
		return false;
	}
	return bannerLabelDependencies.includes(currentChange?.name);
}

// This component is displayed during a questionnaire.
// Its main role is to reassure users that their data is being saved.
// If a bannerAddress is provided through personalization in the SUData,
// this is displayed.

export function DraftBanner() {
	const { unit } = useParams();
	const { currentChange, savingFailure, personalization } = useLunaticContext();

	// saved is used as a flag to display the save message
	const [saved, setSaved] = useState(false);
	const [label, setlabel] = useState(personalization?.bannerLabel ?? '');
	const bannerLabelDependencies = personalization?.bannerLabelDependencies
		? personalization?.bannerLabelDependencies
		: [];
	const timer = useRef<ReturnType<typeof setTimeout>>();
	const duration = 1_500;
	const personalizationLabel =
		typeof personalization?.bannerLabel === 'string'
			? personalization?.bannerLabel
			: '';
	const computedLabel = label ? label : personalizationLabel;

	// personalization is loaded on refresh, but if this value changes, it is not updated by default.
	// By calling the API, we are sure to get the most recent update.
	useAsyncEffect(async () => {
		// We don't want to call the API all the time, so we check if the dependencies have changed then call the api
		if (
			dependenciesHaveChanged(currentChange, bannerLabelDependencies) &&
			unit
		) {
			const updatedSUData = await surveyApi.getSurveyUnitData(unit);
			const newPersonalization: Record<string, string> =
				createPersonalizationMap(updatedSUData?.personalization || []);
			setlabel(
				newPersonalization.bannerLabel ? newPersonalization.bannerLabel : ''
			);
		}
	}, [currentChange]);

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
		<DraftBannerContainer computedLabel={computedLabel as string}>
			{saved ? (
				<Tag iconId="fr-icon-refresh-line">Enregistrement...</Tag>
			) : (
				<Tag iconId="fr-icon-checkbox-circle-line">Brouillon enregistré</Tag>
			)}
		</DraftBannerContainer>
	);
}
