import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { surveyAPI } from '../../../lib/api/survey';
import { CollectStatusEnum, VariablesType } from '../../../typeStromae/type';
import {
	defineCollectStatus,
	defineSavingFailure,
} from '../../../redux/appSlice';

type ChangeEvent = Record<string, unknown>;

function isChanges(changes?: ChangeEvent) {
	return changes && Object.keys(changes).length > 0;
}

function fillValues(
	changes: ChangeEvent,
	getData?: (refreshCalculated: boolean) => VariablesType
) {
	return Object.keys(changes).reduce(
		(a, name) => ({
			...a,
			[name]: getData?.(false)?.COLLECTED[name]?.COLLECTED ?? null,
		}),
		{}
	);
}

export function useSaving(
	getData: (refreshCalculated: boolean) => VariablesType
) {
	const dispatch = useAppDispatch();
	const unit = useAppSelector((state) => state.stromae.unit);

	const save = useCallback(
		async (currentChanges?: Record<string, unknown>) => {
			if (unit) {
				const isOnChange = isChanges(currentChanges);
				if (currentChanges && isOnChange) {
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
						dispatch(defineSavingFailure({ status: 200 }));

						dispatch(defineCollectStatus(CollectStatusEnum.Completed));

						return true;
					}
				}
			}
			return false;
		},
		[unit, dispatch, getData]
	);

	return save;
}
