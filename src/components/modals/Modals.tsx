import { useContext } from 'react';
import { ComponentsRenderer } from '../ComponentsRenderer';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';
import { useAppSelector } from '../../redux/store';
import { useControls } from '../../hooks/useOrchestrator/useControls';

const useStyles = makeStyles()({
	root: {
		'+ .lunatic-component-with-dsfr': {
			marginBottom: '2rem',
		},
	},
});

export function Modals() {
	const { getComponents } = useContext(LunaticContext);
	const currentErrors = useControls();
	const disabled = useAppSelector((s) => s.stromae.onSaving);
	const { classes, cx } = useStyles();

	return (
		<div id="stromae-modals" className={cx(classes.root)}>
			<ComponentsRenderer
				getComponents={getComponents}
				currentErrors={currentErrors}
				disabled={disabled}
				only={['ConfirmationModal']}
			/>
		</div>
	);
}
