import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import { LunaticSource } from '../../typeLunatic/type-source';
import { LunaticData } from '../../typeLunatic/type';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../redux/store';
import { surveyAPI } from '../../lib/api/survey';
import { environment } from '../../utils/read-env-vars';
import {
	appendChanges,
	defineOnSaving,
	turningPage,
} from '../../redux/appSlice';
import { useSaving } from './useSaving';
import { usePrevious } from '../../lib/commons/usePrevious';
import { useSavingStateData } from './useSaving/useSavingStateDada';
import { useControls } from './useControls';

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

type UseOrchestrator = { source?: LunaticSource; data?: LunaticData };

export function useOrchestrator({ source, data }: UseOrchestrator) {
	const dispatch = useAppDispatch();
	const shouldSync = useRef(false);

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

	const onChange = useCallback(
		({ name }: { name: string }) => {
			dispatch(appendChanges(name));
		},
		[dispatch]
	);

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
		pager,
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
	const compileErrors = useControls(compileControls);

	const handleGoPrevious = useCallback(() => {
		shouldSync.current = true;
		goPreviousPage?.();
	}, [goPreviousPage]);

	const handleGoNext = useCallback(async () => {
		const { isCritical, isOnWarning } = compileErrors();
		if (!isCritical && !isOnWarning) {
			shouldSync.current = true;
			dispatch(defineOnSaving(true));
			await save();
			dispatch(defineOnSaving(false));
			goNextPage?.();
		}
	}, [dispatch, compileErrors, save, goNextPage]);

	const previousPageTag = usePrevious(pageTag);
	const isNewPage =
		pageTag !== undefined &&
		previousPageTag !== undefined &&
		previousPageTag !== pageTag;

	if (isNewPage && shouldSync.current) {
		shouldSync.current = false;
		saveStateData(pageTag);
	}

	useEffect(() => {
		dispatch(turningPage({ isFirstPage, isLastPage, pageTag }));
	}, [pageTag, isLastPage, isFirstPage, dispatch]);

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
		pageTag,
		pager,
		save,
	};
}
