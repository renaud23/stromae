import { useEffect, useState } from 'react';
import { MetadataSurvey } from '../typeStromae/type';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { surveyAPI } from '../lib/api/survey';

/**
 *
 * @returns
 */
export function useMetadata() {
	const [metadata, setMetadata] = useState<MetadataSurvey>();
	const survey = useAppSelector((s) => s.stromae.survey);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (survey) {
			const promise = dispatch(
				surveyAPI.endpoints.getMetadataSurvey.initiate(survey)
			);

			(async () => {
				const { data } = await promise;
				setMetadata(data);
			})();
		}
	}, [dispatch, survey]);

	return metadata;
}
