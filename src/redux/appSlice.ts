import { createSlice } from '@reduxjs/toolkit';
import { UNINITIALIZE } from '../lib/api/survey';

export interface StromaeState {
	survey: string;
	unit: string;
}

const initialState = {
	survey: UNINITIALIZE,
	unit: UNINITIALIZE,
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
	},
});
export const { defineSurvey, defineSurveyUnit } = stromaeState.actions;
