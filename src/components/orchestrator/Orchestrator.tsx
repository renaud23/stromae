import { PropsWithChildren, useEffect } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';
import { Controls } from './Controls';
import { UseLunatic } from './UseLunatic';
import { useSelector } from 'react-redux';
import { ApplicationState, useAppSelector } from '../../redux/store';
import { useGetSurveyQuery } from '../../lib/api/survey';

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

/**
 *
 * @param param0
 * @returns
 */
export function Orchestrator({
	children,
	features,
	preferences,
	source,
	surveyUnitData,
}: PropsWithChildren<OrchestratorProps>) {
	const survey = useAppSelector(
		(state: ApplicationState) => state.stromae.survey
	);
	const unit = useSelector((state: ApplicationState) => state.stromae.unit);

	if (survey && unit) {
		return (
			<UseLunatic
				features={features}
				preferences={preferences}
				autoSuggesterLoading={true}
				paginated={true}
				activeControls={true}
				source={source}
				surveyUnitData={surveyUnitData}
			>
				<Controls>{children}</Controls>
			</UseLunatic>
		);
	}
	return null;
}
