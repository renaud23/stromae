import { useCallback } from 'react';
import { surveyApi } from '../lib/surveys/surveysApi';
import { useRemote } from '../components/orchestrator/useRemote';

export function useSurveyUnitData(unit?: string, onError = () => {}) {
	const getSurveyUnitData = useCallback(async () => {
		if (unit) {
			return surveyApi.getSurveyUnitData(unit);
		}
		return undefined;
	}, [unit]);

	const lunaticSource = useRemote(getSurveyUnitData, onError);

	return lunaticSource;
}
