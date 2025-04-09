import { useCallback } from 'react';
import { surveyApi } from '../lib/surveys/surveysApi';
import { useRemote } from '../components/orchestrator/useRemote';

export function useSurvey(survey?: string, onError = () => {}) {
	const getSurvey = useCallback(async () => {
		if (survey) {
			return surveyApi.getSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const lunaticSource = useRemote(getSurvey, onError);

	return lunaticSource;
}
