import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import { LunaticSource } from '../../typeLunatic/type-source';
import { LunaticData } from '../../typeLunatic/type';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { surveyAPI } from '../../lib/api/survey';
import {
	askForTurningPage,
	defineOnSaving,
	turningPage,
} from '../../redux/appSlice';
import { useSaving } from './useSaving';
import { useSavingStateData } from './useSaving/useSavingStateDada';

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

type UseOrchestrator = { source?: LunaticSource; data?: LunaticData };

function resolveChanges(changes: Array<string>) {
	return changes.reduce(
		(acc, curr) => (curr in acc ? acc : { ...acc, [curr]: null }),
		{}
	);
}

export function useOrchestrator({ source, data }: UseOrchestrator) {
	const dispatch = useAppDispatch();
	const currentChanges = useRef<Array<string>>([]);

	const startTurningPage = useAppSelector((s) => s.stromae.startTurningPage);
	const startControls = useAppSelector((s) => s.stromae.startControls);
	const isOnWarning = useAppSelector((s) => s.stromae.isOnWarning);
	const isOnError = useAppSelector((s) => s.stromae.isOnError);

	const getReferentiel = useCallback(
		async (name: string) => {
			const promise = dispatch(
				surveyAPI.endpoints.getNomenclature.initiate(name)
			);
			const { data } = await promise;
			return data;
		},
		[dispatch]
	);

	const onChange = useCallback(({ name }: { name: string }) => {
		currentChanges.current.push(name);
	}, []);

	const {
		getComponents,
		goPreviousPage,
		goNextPage,
		isFirstPage,
		isLastPage,
		goToPage,
		getData,
		Provider,
		compileControls,
		pageTag,
	} = useLunatic(source, data, {
		getReferentiel,
		custom,
		features: FEATURES,
		savingType: COLLECTED,
		autoSuggesterLoading: true,
		workersBasePath: `${window.location.origin}/workers`,
		onChange,
	});
	const save = useSaving(getData);
	const saveStateData = useSavingStateData();

	const handleGoPrevious = useCallback(() => {
		goPreviousPage?.();
	}, [goPreviousPage]);

	const handleGoNext = useCallback(async () => {
		dispatch(askForTurningPage());
	}, [dispatch]);

	/* 
	 	Gestion de page suivante 
	*/
	useEffect(() => {
		if (startTurningPage && !startControls) {
			(async () => {
				if (!isOnWarning && !isOnError) {
					goNextPage();
					dispatch(defineOnSaving(true));
					const success = await save(resolveChanges(currentChanges.current));
					if (success) {
						currentChanges.current.splice(0, currentChanges.current.length);
					}
					dispatch(defineOnSaving(false));
				}
			})();
		}
	}, [
		startControls,
		isOnWarning,
		isOnError,
		dispatch,
		save,
		startTurningPage,
		goNextPage,
	]);

	/* 
		Page tournée
	*/
	useEffect(() => {
		saveStateData(pageTag);
		dispatch(turningPage({ isFirstPage, isLastPage, pageTag }));
	}, [pageTag, isLastPage, isFirstPage, dispatch, saveStateData]);

	return {
		getComponents,
		goPreviousPage: handleGoPrevious,
		goNextPage: handleGoNext,
		isFirstPage,
		isLastPage,
		goToPage,
		getData,
		Provider,
		compileControls,
	};
}
