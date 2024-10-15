import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { defineSurvey, defineSurveyUnit } from '../redux/appSlice';
import { UNINITIALIZE } from '../lib/api/survey';

/**
 * Met sur State, les paramètres issus de l'url
 * @returns { survey: string; unit?: string; }
 */
export function useStromaePage() {
	const { survey = UNINITIALIZE, unit = UNINITIALIZE, optional } = useParams();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (survey && unit) {
			dispatch(defineSurveyUnit({ survey, unit }));
		} else if (survey) {
			dispatch(defineSurvey(survey));
		}
	}, [dispatch, survey, unit]);

	return { survey, unit, optional };
}
