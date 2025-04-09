import { useCallback, useRef, useState } from 'react';
import { CollectStatusEnum, SavingFailure } from '../../../typeStromae/type';
import { surveyApi } from '../../../lib/surveys';

function getCollectStatus(changing: boolean, previous: CollectStatusEnum) {
	if (previous === CollectStatusEnum.Validated) {
		return CollectStatusEnum.Validated;
	}
	if (changing) {
		return CollectStatusEnum.Completed;
	}

	return previous;
}

type useSavingArgs = {
	setWaiting: (w: boolean) => void;
	setFailure: (s?: SavingFailure) => void;
	initialCollectStatus: CollectStatusEnum;
	unit: string;
};

export function useSaving({
	setWaiting,
	setFailure,
	initialCollectStatus,
	unit,
}: useSavingArgs) {
	const [currentStatus, setCurrentStatus] = useState(initialCollectStatus);
	const changes = useRef<Map<string, unknown>>(new Map());

	const listenChange = useCallback((componentName: string, value: unknown) => {
		changes.current.set(componentName, value);
	}, []);

	const saveChange = useCallback(
		async ({ pageTag, getData }: { pageTag: string; getData: () => any }) => {
			setFailure(undefined);
			setWaiting(true);
			try {
				// save data
				const isOnChange = changes.current.size !== 0;
				if (isOnChange) {
					const lunaticValues = getData()?.COLLECTED ?? {};
					const keys = Array.from(changes.current.keys());
					const payload = Object.entries(
						Object.fromEntries(changes.current)
					).reduce((acc, [name]) => {
						return { ...acc, [name]: lunaticValues[name]?.COLLECTED ?? null };
					}, {});
					await surveyApi.putSurveyUnitData(payload, unit);
					setFailure({ status: 200 });

					for (const variable of keys) {
						changes.current.delete(variable);
					}
				}
				// save stateData
				const state = getCollectStatus(isOnChange, currentStatus);
				await surveyApi.putSurveyUnitStateData(
					{
						currentPage: pageTag,
						state,
						date: new Date().getTime(),
					},
					unit
				);
				setCurrentStatus(state);
				setWaiting(false);
			} catch (e) {
				setFailure({ status: 500 });
				setWaiting(false);
			}
		},
		[currentStatus, setFailure, setWaiting, unit]
	);

	return { listenChange, saveChange };
}
