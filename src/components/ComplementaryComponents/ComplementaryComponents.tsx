import { useContext } from 'react';
import { ComponentsRenderer } from '../ComponentsRenderer';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';

const useStyles = makeStyles()({
	root: {
		padding: 0,
		'+ .lunatic-component-with-dsfr': {
			marginBottom: 0,
		},
	},
});

const only = ['QuestionExplication'];

/**
 * Components displayed at the bottom of the page
 * For instance QuestionExplication to show more detail about a question
 */
export function ComplementaryComponents() {
	const { classes, cx } = useStyles();
	const { getComponents } = useContext(LunaticContext);

	const components = getComponents?.({ only });

	if (components?.length === 0) {
		return null;
	}

	return (
		<div
			id="complementary-components"
			className={cx(classes.root, 'fr-col-12')}
		>
			<ComponentsRenderer only={only} />
		</div>
	);
}
