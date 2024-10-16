import { createSlice } from '@reduxjs/toolkit';
import { CollectStatusEnum, SavingFailure } from '../typeStromae/type';
import { LunaticError } from '../typeLunatic/type';

export interface StromaeState {
	survey?: string;
	unit?: string;
	collectStatus?: CollectStatusEnum;
	savingFailure?: SavingFailure;
	currentErrors?: Record<string, Array<LunaticError>>;
	onSaving: boolean;
	pageTag?: string;
	isCritical?: boolean;
	isLastPage?: boolean;
	isFirstPage?: boolean;
}

const initialState: StromaeState = {
	survey: undefined,
	unit: undefined,
	collectStatus: undefined,
	savingFailure: undefined,
	onSaving: false,
	pageTag: undefined,
	isCritical: undefined,
	isLastPage: undefined,
	isFirstPage: undefined,
	currentErrors: undefined,
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
		defineOnSaving: (state, action) => {
			state.onSaving = action.payload;
		},
		defineCurrentErrors: (state, action) => {
			state.currentErrors = action.payload.currentErrors;
			state.isCritical = action.payload.isCritical;
		},
		turningPage: (state, action) => {
			state.pageTag = action.payload.pageTag;
			state.isLastPage = action.payload.isLastPage;
			state.isFirstPage = action.payload.isFirstPage;
		},
	},
});
export const {
	defineSurvey,
	defineSurveyUnit,
	defineCollectStatus,
	defineSavingFailure,
	defineOnSaving,
	turningPage,
	defineCurrentErrors,
} = stromaeState.actions;
