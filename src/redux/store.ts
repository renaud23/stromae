import { configureStore } from '@reduxjs/toolkit';
import { surveyAPI } from '../lib/api/survey';
import { stromaeState } from './appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { oidcAPI } from '../lib/api/oidcAPI';

export const store = configureStore({
	reducer: {
		[oidcAPI.reducerPath]: oidcAPI.reducer,
		[surveyAPI.reducerPath]: surveyAPI.reducer,
		[stromaeState.reducerPath]: stromaeState.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(surveyAPI.middleware, oidcAPI.middleware),
});

export type ApplicationDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<ApplicationDispatch>();
export const useAppSelector = useSelector.withTypes<ApplicationState>();
