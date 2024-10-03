import { createSlice } from '@reduxjs/toolkit';
import { UNINITIALIZE } from '../lib/api/survey';
import { CollectStatusEnum } from '../typeStromae/type';

export interface StromaeState {
	survey: string;
	unit: string;
	collectStatus?: CollectStatusEnum;
}

const initialState = {
	survey: UNINITIALIZE,
	unit: UNINITIALIZE,
	collectStatus: CollectStatusEnum.Init,
};

export const stromaeState = createSlice({
	name: 'stromae',
	initialState,
	reducers: {
		defineSurvey: (state, action) => {
			state.survey = action.payload;
		},
		defineSurveyUnit: (state, action) => {
			state.survey = action.payload.survey;
			state.unit = action.payload.unit;
		},
		defineCollectStatus: (state, action) => {
			state.collectStatus = action.payload.collectStatus;
		},
	},
});
export const { defineSurvey, defineSurveyUnit, defineCollectStatus } =
	stromaeState.actions;
