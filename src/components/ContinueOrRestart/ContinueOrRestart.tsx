import { useState, useCallback, useContext, useEffect } from 'react';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';
import { useAppSelector } from '../../redux/store';
import { useGetSurveyAPI } from '../../lib/api/useGetSurveyUnitAPI';

export function ContinueOrRestart() {
	const { goToPage } = useContext(LunaticContext);
	const unit = useAppSelector((s) => s.stromae.unit);

	const { data } = useGetSurveyAPI({ unit });
	const pageFromAPI = data?.stateData.currentPage;

	const [display, setDisplay] = useState(false);

	function onClose() {
		setDisplay(false);
	}

	const onContinue = useCallback(() => {
		if (!pageFromAPI) {
			return;
		}
		goToPage?.({ page: pageFromAPI });
		setDisplay(false);
	}, [pageFromAPI, goToPage]);

	const onRestart = useCallback(() => {
		goToPage?.({ page: '1' });
		setDisplay(false);
	}, [goToPage]);

	useEffect(() => {
		if (pageFromAPI && pageFromAPI !== '1') {
			setDisplay(true);
		}
	}, [pageFromAPI]);

	if (display) {
		return (
			<ModalContinueOrRestart
				onContinue={onContinue}
				onRestart={onRestart}
				onClose={onClose}
			/>
		);
	}
	return null;
}
