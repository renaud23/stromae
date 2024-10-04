import { useState, useCallback, useContext } from 'react';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';
import { useGetSurveyUnitQuery } from '../../lib/api/survey';
import { useAppSelector } from '../../redux/store';

export function ContinueOrRestart() {
	const { goToPage } = useContext(LunaticContext);
	const unit = useAppSelector((s) => s.stromae.unit);
	const { data } = useGetSurveyUnitQuery(unit);
	const pageFromAPI = data?.stateData.currentPage;
	const [display, setDisplay] = useState(pageFromAPI && pageFromAPI !== '1');

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

	if (!display) {
		return null;
	}
	return (
		<ModalContinueOrRestart
			onContinue={onContinue}
			onRestart={onRestart}
			onClose={onClose}
		/>
	);
}
