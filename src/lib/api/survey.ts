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
		getNomenclature: builder.query<Record<string, unknown>, string>({
			query: (nomenclature: string) => `/api/nomenclature/${nomenclature}`,
		}),
		putSurveyUnitData: builder.mutation({
			query: ({ unit, ...body }) => ({
				url: `/api/survey-unit/${unit}/data`,
				method: 'PUT',
				body,
			}),
		}),
		putStateData: builder.mutation({
			query: ({ unit, ...body }) => ({
				url: `/api/survey-unit/${unit}/state-data`,
				method: 'PUT',
				body,
			}),
		}),
	}),
});

export const {
	useGetSurveyQuery,
	useGetMetadataSurveyQuery,
	useGetSurveyUnitQuery,
} = surveyAPI;
