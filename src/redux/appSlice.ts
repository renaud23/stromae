import { createSlice } from '@reduxjs/toolkit';
import { SurveyUnit } from '../typeLunatic/type-source';

export interface StromaeState {
	survey: string;
	unit: string;
}

const initialState = {
	survey: 'undefined',
	unit: 'undefined',
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
