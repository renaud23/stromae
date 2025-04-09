import { useNavigate, useParams } from 'react-router';

import { uri423, uri404 } from '../../lib/domainUri';
import { removeDeclarationsAfterFromSource } from '../../utils/questionnaire';

import { useMetadata } from '../../hooks/useMetadata';
import { useSurvey } from '../../hooks/useSurvey';
import { useSurveyUnitData } from '../../hooks/useSurveyUnitData';

export type responseData = {
	status: number;
	message: string;
};

export function useRemoteSurveyJson() {
	const { survey, unit } = useParams();
	const navigate = useNavigate();

	function navigateError(data?: responseData) {
		if (data?.status) {
			if (data.status === 423) {
				navigate(uri423(survey, data.message));
			} else {
				navigate(uri404());
			}
		}
	}

	const metadata = useMetadata(survey, navigateError);
	// const metadata = useRemote<MetadataSurvey>(getMetadata, navigateError);
	const source = useSurvey(survey, navigateError);
	const surveyUnitData = useSurveyUnitData(unit, navigateError);

	const sourceWithoutDeclarationsAfter =
		removeDeclarationsAfterFromSource(source);

	return {
		source: sourceWithoutDeclarationsAfter,
		metadata,
		surveyUnitData,
	};
}
