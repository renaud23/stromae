import { useCallback } from 'react';
import { surveyApi } from '../lib/surveys/surveysApi';

import { useRemote } from '../components/orchestrator/useRemote';

export function useMetadata(survey?: string, onError = () => {}) {
	const getMetadata = useCallback(async () => {
		if (survey) {
			return surveyApi.getMetadataSurvey(survey);
		}
		return undefined;
	}, [survey]);

	const metadata = useRemote(getMetadata, onError);

	return metadata;
}
