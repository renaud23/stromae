import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { surveyAPI } from '../../../lib/api/survey';
import { CollectStatusEnum } from '../../../typeStromae/type';

type useSavingArgs = {
	// setWaiting: (w: boolean) => void;
	// setFailure: (s?: SavingFailure) => void;
	initialCollectStatus: CollectStatusEnum;
};

export function useSavingStateData() {
	const dispatch = useAppDispatch();
	const unit = useAppSelector((state) => state.stromae.unit);
	const collectStatus = useAppSelector((state) => state.stromae.collectStatus);

	const save = useCallback(
		async (page: string) => {
			await dispatch(
				surveyAPI.endpoints.putStateData.initiate({
					currentPage: page,
					unit,
					state: collectStatus,
				})
			);
		},
		[collectStatus, dispatch, unit]
	);

	return save;
}
