import * as lunatic from '@inseefr/lunatic';
import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer';
import { LunaticComponents } from '@inseefr/lunatic';
import { useContext, type ReactNode } from 'react';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';
import { useAppSelector } from '../../redux/store';
import { LunaticInterface } from '../../typeStromae/type';
import { LunaticError } from '../../typeLunatic/type-source';
import { useControls } from '../../hooks/useOrchestrator/useControls';

type Props = {
	only?: string[];
	except?: string[];
	// Key that trigger a new autofocus on the first field
	focusKey?: string;
	disabled?: boolean;
	currentErrors?: Record<string, Array<LunaticError>>;
} & Pick<LunaticInterface, 'getComponents'>;

export function ComponentsRenderer(props: Props) {
	const { only, except, focusKey, ...rest } = props;

	const { getComponents } = useContext(LunaticContext);
	const currentErrors = useControls();
	const disabled = useAppSelector((s) => s.stromae.onSaving);
	const validComponents =
		getComponents?.({ only, except }).filter(
			(c) => c.componentType in lunatic
		) ?? [];

	return (
		<LunaticComponents
			autoFocusKey={computeFocusKey(focusKey, currentErrors)}
			components={validComponents as any}
			componentProps={() => ({
				...rest,
				errors: currentErrors,
				disabled,
			})}
			wrapper={({ children, id }: { children: ReactNode; id: string }) => (
				<LunaticComponentContainer id={id} children={children} />
			)}
		/>
	);
}

const computeFocusKey = (
	base?: string,
	currentErrors?: Record<string, unknown>
) => {
	if (!base) {
		return null;
	}
	if (currentErrors) {
		return [base, ...Object.keys(currentErrors)].join('-');
	}
	return currentErrors;
};
