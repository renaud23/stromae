import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { surveyAPI } from '../../../lib/api/survey';
import { CollectStatusEnum, VariablesType } from '../../../typeStromae/type';
import {
	defineCollectStatus,
	defineSavingFailure,
	resetChanges,
} from '../../../redux/appSlice';

type ChangeEvent = Record<string, unknown>;

function isChanges(changes: ChangeEvent) {
	return changes && Object.keys(changes).length > 0;
}

function fillValues(
	changes: ChangeEvent,
	getData: (refreshCalculated: boolean) => VariablesType
) {
	return Object.keys(changes).reduce(
		(a, name) => ({
			...a,
			[name]: getData?.(false)?.COLLECTED[name]?.COLLECTED,
		}),
		{}
	);
}

export function useSaving(
	getData: (refreshCalculated: boolean) => VariablesType
) {
	const dispatch = useAppDispatch();
	const unit = useAppSelector((state) => state.stromae.unit);
	const currentChanges = useAppSelector((s) => s.stromae.currentChanges);
	const collectStatus = useAppSelector((state) => state.stromae.collectStatus);

	const save = useCallback(async () => {
		if (unit) {
			const isOnChange = isChanges(currentChanges);
			if (isOnChange) {
				dispatch(defineSavingFailure(undefined));
				const promise = dispatch(
					surveyAPI.endpoints.putSurveyUnitData.initiate({
						unit,
						...fillValues(currentChanges, getData),
					})
				);
				const { error } = await promise;
				if (error) {
					dispatch(defineSavingFailure({ status: 500 }));
				} else {
					dispatch(resetChanges());
					dispatch(defineSavingFailure({ status: 200 }));
					if (collectStatus !== CollectStatusEnum.Completed) {
						dispatch(defineCollectStatus(CollectStatusEnum.Completed));
					}
				}
			}
		}
	}, [unit, currentChanges, dispatch, getData, collectStatus]);

	return save;
}
