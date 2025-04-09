import { useState, useCallback, useEffect } from 'react';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';
import { useLunaticContext } from '../orchestrator/useLunaticContext';

export function ContinueOrRestart() {
	const { goToPage, initialData } = useLunaticContext();
	const pageFromAPI = initialData?.stateData.currentPage;
	const [display, setDisplay] = useState(false);

	useEffect(() => {
		if (pageFromAPI && pageFromAPI !== '1') {
			setDisplay(true);
		}
	}, [pageFromAPI]);

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
