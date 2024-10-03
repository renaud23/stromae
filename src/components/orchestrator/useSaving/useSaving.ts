import { useCallback, useRef, useState } from 'react';
import { useSaveSurveyUnitStateData } from '../../../hooks/useSaveSurveyUnitData';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { surveyAPI } from '../../../lib/api/survey';
import { useNavigate } from 'react-router';
import { uri404 } from '../../../lib/domainUri';
import { CollectStatusEnum } from '../../../typeStromae/type';
import { defineCollectStatus } from '../../../redux/appSlice';

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
	// setWaiting: (w: boolean) => void;
	// setFailure: (s?: SavingFailure) => void;
	initialCollectStatus: CollectStatusEnum;
};

// export function useSaving({
// 	setWaiting,
// 	setFailure,
// 	initialCollectStatus,
// }: useSavingArgs) {
// 	const [currentStatus, setCurrentStatus] = useState(initialCollectStatus);
// 	const changes = useRef<Map<string, unknown>>(new Map());
// 	const saveSuData = useSaveSurveyUnitStateData();
// 	const { putSurveyUnitData } = useContext(loadSourceDataContext);
// 	const listenChange = useCallback((componentName: string, value: unknown) => {
// 		changes.current.set(componentName, value);
// 	}, []);

// 	const saveChange = useCallback(
// 		async ({ pageTag, getData }: { pageTag: string; getData: () => any }) => {
// 			setFailure(undefined);
// 			setWaiting(true);
// 			try {
// 				// save data
// 				const isOnChange = changes.current.size !== 0;
// 				if (isOnChange) {
// 					const lunaticValues = getData()?.COLLECTED ?? {};
// 					const keys = Array.from(changes.current.keys());
// 					const payload = Object.entries(
// 						Object.fromEntries(changes.current)
// 					).reduce((acc, [name]) => {
// 						return { ...acc, [name]: lunaticValues[name]?.COLLECTED ?? null };
// 					}, {});
// 					await putSurveyUnitData(payload);
// 					setFailure({ status: 200 });

// 					for (const variable of keys) {
// 						changes.current.delete(variable);
// 					}
// 				}
// 				// save stateData
// 				const state = await saveSuData({
// 					pageTag,
// 					collectStatus: getCollectStatus(isOnChange, currentStatus),
// 				});
// 				setCurrentStatus(state.state);
// 				setWaiting(false);
// 			} catch (e) {
// 				setFailure({ status: 500 });
// 				setWaiting(false);
// 			}
// 		},
// 		[currentStatus, putSurveyUnitData, setFailure, setWaiting, saveSuData]
// 	);

// 	return { listenChange, saveChange };
// }

type ChangeEvent = Record<string, undefined | null | string | boolean | number>;

function isChanges(changes: ChangeEvent) {
	return changes && Object.keys(changes).length > 0;
}

function saflyClean(changes: ChangeEvent) {
	if (changes) {
		Object.keys(changes).forEach((k) => delete changes[k]);
	}
}

export function useSaving() {
	const changes = useRef<ChangeEvent>({});
	const navigate = useNavigate();

	const listen = useCallback(
		(name: string, value?: string | number | boolean) => {
			changes.current[name] = value;
		},
		[changes]
	);

	const dispatch = useAppDispatch();
	const unit = useAppSelector((state) => state.stromae.unit);
	const collectStatus = useAppSelector((state) => state.stromae.collectStatus);

	const save = useCallback(
		async ({ pageTag }: { pageTag: string }) => {
			if (unit) {
				const isOnChange = isChanges(changes.current);
				if (isOnChange) {
					const promise = dispatch(
						surveyAPI.endpoints.putSurveyUnitData.initiate({
							unit,
							...changes.current,
						})
					);
					const { error } = await promise;
					if (error) {
						navigate(uri404());
						// TODO dispatch error
					} else {
						saflyClean(changes.current);
						await dispatch(
							surveyAPI.endpoints.putStateData.initiate({
								currentPage: pageTag,
								unit,
								state: getCollectStatus(
									isOnChange,
									collectStatus || CollectStatusEnum.Completed
								),
							})
						);
						if (collectStatus !== CollectStatusEnum.Completed) {
							dispatch(defineCollectStatus(CollectStatusEnum.Completed));
						}

						// TODO dispatch success
					}
				}
			}
		},
		[unit, dispatch, navigate, collectStatus]
	);

	return { listen, save };
}
