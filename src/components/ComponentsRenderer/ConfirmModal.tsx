import { GoToPage } from '../../typeLunatic/type-source';
import { ModalDsfr } from '../ContinueOrRestart/ModalDsfr';
import { useCallback, useState } from 'react';

export function ConfirmationModal(props: { goToPage?: GoToPage }) {
	const { goToPage } = props;
	const [display, setDisplay] = useState(true);

	const onClose = useCallback(() => {
		setDisplay(false);
		console.log('lo', goToPage);
		goToPage?.({ page: '17' });
	}, [goToPage]);

	if (!display) {
		return null;
	}
	return <ModalDsfr close={onClose}>Hello World!</ModalDsfr>;
}
