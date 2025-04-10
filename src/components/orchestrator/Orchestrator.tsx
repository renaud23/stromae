import { PropsWithChildren } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';
import { lunaticContext } from './useLunaticContext';
import { useRemoteSurveyJson } from './useRemoteSurveyJson';
import { useOrchestrator } from './useOrchestrator';
import { useControls } from './useControls';
import { useParams } from 'react-router';
import { surveyApi } from '../../lib/surveys';

export type OrchestratorProps = {
	source?: LunaticSource;
	surveyUnitData?: SurveyUnitData;
	suggesterFetcher?: any;
	onChange?: (...args: any) => void;
	getReferentiel?: (name: string) => Promise<Array<unknown>>;
	activeControls?: boolean;
	autoSuggesterLoading?: boolean;
	features?: Array<string>;
	preferences?: Array<string>;
	savingType?: string;
	paginated?: boolean;
	disabled?: boolean;
	metadata?: MetadataSurvey;
};

export type SurveyChange = { name: string; value?: unknown };

export function OrchestratorReady({
	children,
	features,
	preferences,
	source,
	surveyUnitData,
	disabled,
	unit,
}: PropsWithChildren<
	OrchestratorProps & { source: LunaticSource; unit: string }
>) {
	const initialData = surveyUnitData;

	const {
		Provider,
		goToPage,
		goNextPage,
		compileControls,
		goPreviousPage,
		pageTag,
		getComponents,
		getData,
		isLastPage,
		isFirstPage,
		waiting,
		currentChange,
		savingFailure,
	} = useOrchestrator({
		source,
		features,
		preferences,
		surveyUnitData,
		unit,
		getReferentiel: surveyApi.getNomenclature,
		autoSuggesterLoading: true,
	});

	const {
		goNextPage: goNextPageWithControls,
		goPreviousPage: goPreviousPageWithControls,
		currentErrors,
		criticality,
	} = useControls({ goNextPage, goPreviousPage, pageTag, compileControls });

	return (
		<Provider>
			<lunaticContext.Provider
				value={{
					goToPage,
					goNextPage: goNextPageWithControls,
					compileControls,
					goPreviousPage: goPreviousPageWithControls,
					pageTag,
					getComponents,
					isLastPage,
					isFirstPage,
					waiting,
					currentErrors,
					disabled,
					initialData,
					currentChange,
					savingFailure,
					getData,
					criticality,
					personalization: initialData?.personalization,
				}}
			>
				{children}
			</lunaticContext.Provider>
		</Provider>
	);
}

/**
 *
 * @param param0
 * @returns
 */
export function Orchestrator({
	children,
	features,
	preferences,
}: PropsWithChildren<OrchestratorProps>) {
	const { unit } = useParams();
	const { source, surveyUnitData } = useRemoteSurveyJson();

	if (source && unit) {
		return (
			<OrchestratorReady
				source={source}
				surveyUnitData={surveyUnitData}
				features={features}
				preferences={preferences}
				disabled={false}
				unit={unit}
			>
				{children}
			</OrchestratorReady>
		);
	}
	return null;
}
