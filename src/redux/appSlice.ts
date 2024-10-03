import { createSlice } from '@reduxjs/toolkit';
import { UNINITIALIZE } from '../lib/api/survey';
import { CollectStatusEnum } from '../typeStromae/type';

export interface StromaeState {
	survey: string;
	unit: string;
	collectStatus?: CollectStatusEnum;
	savingFailure?: boolean;
}

const initialState = {
	survey: UNINITIALIZE,
	unit: UNINITIALIZE,
	collectStatus: CollectStatusEnum.Init,
	savingFailure: false,
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
			state.collectStatus = action.payload;
		},
		defineSavingFailure: (state, action) => {
			state.savingFailure = action.payload;
		},
	},
});
export const { defineSurvey, defineSurveyUnit, defineCollectStatus } =
	stromaeState.actions;
