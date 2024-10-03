import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from '../../utils/read-env-vars';
import { LunaticSource } from '../../typeLunatic/type-source';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';

export const UNINITIALIZE = 'RTK_UNITILIATLIZE';

export const surveyAPI = createApi({
	reducerPath: 'surveyAPI',
	baseQuery: fetchBaseQuery({ baseUrl: environment.DOMAIN }),
	endpoints: (builder) => ({
		getSurvey: builder.query<LunaticSource, string>({
			query: (survey) => `/api/questionnaire/${survey}`,
		}),
		getSurveyUnit: builder.query<SurveyUnitData, string>({
			query: (unit) => `/api/survey-unit/${unit}`,
		}),
		getMetadataSurvey: builder.query<MetadataSurvey, string>({
			query: (survey) => `/api/questionnaire/${survey}/metadata`,
		}),
	}),
});

export const {
	useGetSurveyQuery,
	useGetMetadataSurveyQuery,
	useGetSurveyUnitQuery,
} = surveyAPI;
