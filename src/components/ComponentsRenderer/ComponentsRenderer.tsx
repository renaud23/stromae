import * as lunatic from '@inseefr/lunatic';

import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer';
import { LunaticComponents } from '@inseefr/lunatic';
import { type ReactNode } from 'react';
import { ComponentType, LunaticError } from '../../typeLunatic/type-source';
import {
	CollectStatusEnum,
	SavingFailure,
	VariablesType,
} from '../../typeStromae/type';

export type OrchestratedElement = {
	// useLunatic interface
	readonly getComponents?: (arg?: {
		only?: string[];
		except?: string[];
	}) => Array<ComponentType>;
	readonly goPreviousPage?: () => void;
	readonly goNextPage?: (arg?: { block: boolean }) => void;
	readonly goToPage?: (page: { page: string; iteration?: number }) => void;
	readonly getErrors?: () => Record<
		string,
		Record<string, Array<LunaticError>>
	>;
	readonly getModalErrors?: () => Record<string, Array<LunaticError>>;
	readonly getCurrentErrors?: () => Record<string, Array<LunaticError>>;
	readonly isFirstPage?: boolean;
	readonly isLastPage?: boolean;
	readonly onChange?: (...args: any) => void;
	readonly getData?: (refreshCalculated: boolean) => VariablesType;
	readonly compileControls?: () => {
		isCritical: boolean;
		currentErrors?: Record<string, Array<LunaticError>>;
	};
	readonly pageTag?: string;
	personalization?: Record<string, string | number | boolean | Array<string>>;
	// controls errors
	currentErrors?: Record<string, Array<LunaticError>>;
	criticality?: boolean;
	refreshControls?: boolean;
	setRefreshControls?: (value: boolean) => void;
	// handleChange
	currentChange?: { name: string };
	// saving
	savingFailure?: SavingFailure;
	waiting?: boolean;
	// disabled all components
	disabled?: boolean;
	// Page given by API.getSuData at launch
	pageFromAPI?: string;
	// last status of survey, give by the API ('INIT' | 'COLLECTED' | 'VALIDATED')
	initialCollectStatus?: CollectStatusEnum;
	only?: string[];
	except?: string[];
	title?: string;
};

type Props = {
	only?: string[];
	except?: string[];
	// Key that trigger a new autofocus on the first field
	focusKey?: string;
} & Pick<
	OrchestratedElement,
	| 'currentErrors'
	| 'disabled'
	| 'getComponents'
	| 'goToPage'
	| 'goPreviousPage'
	| 'goNextPage'
>;

export function ComponentsRenderer(props: Props) {
	const {
		getComponents,
		currentErrors,
		disabled = false,
		only,
		except,
		focusKey,
		...rest
	} = props;
	const validComponents =
		getComponents?.({ only, except }).filter(
			(c) => c.componentType in lunatic
		) ?? [];

	return (
		<>
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
		</>
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
