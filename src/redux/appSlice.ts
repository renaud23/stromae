import { createSlice } from '@reduxjs/toolkit';
import { CollectStatusEnum, SavingFailure } from '../typeStromae/type';

export interface StromaeState {
	survey?: string;
	unit?: string;
	collectStatus?: CollectStatusEnum;
	savingFailure?: SavingFailure;
	// currentErrors?: Record<string, Array<LunaticError>>;
	onSaving: boolean;
	pageTag?: string;
	isCritical?: boolean;
	isLastPage?: boolean;
	isFirstPage?: boolean;

	startTurningPage: boolean;
	startControls: boolean;
	isOnError: boolean;
	isOnWarning: boolean;
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
	startTurningPage: false,
	startControls: false,
	isOnError: false,
	isOnWarning: false,
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
		askForTurningPage: (state) => {
			state.startTurningPage = true;
			state.startControls = true;
		},
		terminateControls: (state, action) => {
			state.startControls = false;
			state.isOnError = action.payload.isOnError;
			state.isOnWarning = action.payload.isOnWarning;
		},
		turningPage: (state, action) => {
			state.pageTag = action.payload.pageTag;
			state.isLastPage = action.payload.isLastPage;
			state.isFirstPage = action.payload.isFirstPage;
			state.startTurningPage = false;
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
	terminateControls,
	askForTurningPage,
} = stromaeState.actions;
