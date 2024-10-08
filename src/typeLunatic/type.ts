import { ReactNode } from 'react';

import {
	ComponentType,
	ControlType,
	LunaticSource,
	Variable,
} from './type-source';
// import { ExpressionLogger } from './commons/execute-expression/create-execute-expression';

export type LunaticComponentDefinition<
	T extends ComponentType['componentType'] = ComponentType['componentType'],
> = ComponentType & { componentType: T };
export type LunaticControl = ControlType;

export type VTLBindings = { [variableName: string]: unknown };

export type LunaticData = {
	CALCULATED?: Record<string, unknown>;
	EXTERNAL?: Record<string, unknown>;
	COLLECTED?: Record<string, LunaticCollectedValue>;
};

export type LunaticValues = {
	[variableName: string]: unknown;
};

export type LunaticError = Pick<
	ControlType,
	'id' | 'criticality' | 'typeOfControl'
> & {
	formula: string;
	labelFormula: string;
	errorMessage: ReactNode;
};

export type VariableType = 'COLLECTED' | 'EXTERNAL' | 'CALCULATED';
export type ExpressionType = 'VTL' | 'VTL|MD';
export type LunaticExpression = {
	value: string;
	type: ExpressionType;
	bindingDependencies?: string[];
};
// Temporary type to mark types as unresolved
export type TODO = unknown;

export type LunaticVariable = Variable;
export type LunaticCollectedValue = {
	COLLECTED: unknown;
	EDITED: unknown;
	FORCED: unknown;
	INPUTED: unknown;
	PREVIOUS: unknown;
};

// We need a mapped type to correlate type and variableType
export type LunaticStateVariable = {
	[key in LunaticVariable['variableType']]: {
		type: key;
		value: unknown;
		variable: LunaticVariable & { variableType: key };
		CalculatedLinked?: LunaticVariable[];
	};
}[LunaticVariable['variableType']];

export type LunaticState = {
	variables: {
		[variableName: string]: LunaticStateVariable;
	};
	pages: {
		[key: number | string]:
			| {
					components: ComponentType[];
					isLoop: false;
					iterations?: undefined;
					loopDependencies?: undefined;
					subPages?: undefined;
			  }
			| {
					components: ComponentType[];
					isLoop: true;
					iterations: ExpressionType;
					// Variables affecting this loop
					loopDependencies: string[];
					// List of child pages (ex: ['20.1', '20.2']
					subPages: string[];
			  };
	};
	isInLoop: boolean;
	isFirstPage: boolean;
	isLastPage: boolean;
	features: 'VTL'[];
	preferences: ['COLLECTED'];
	savingType: 'COLLECTED';
	// Map of variable associated with the expression used to repopulate it
	cleaning: LunaticSource['cleaning'];
	// Map of variable with the missing variable names associated with it ex: {ADR_COLL: ['ADR_COLL_MISSING']}
	missingBlock: { [variable: string]: string[] };
	// Map of variable with the missing variable names associated with it ex: {ADR_COLL: ['ADR_COLL_MISSING']}
	resizing: {
		[variable: string]: {
			// VTL expression
			size: string;
			// List of variables that will need resizing
			variables: string[];
			sizeForLinksVariables?: unknown;
			linksVariables?: string[];
		};
	};
	pager: {
		lastReachedPage?: string;
		maxPage: string;
		nbSubPages?: number;
		page: string;
		subPage?: number;
		// Iteration index (starting at 0)
		iteration?: number;
		nbIterations?: number;
		shallowIteration?: number;
		linksIterations?: number[];
		roundabout?: { page: string };
	};
	// TODO : Explain this
	waiting: boolean;
	// Errors for the form
	errors?: { [page: string]: { [id: string]: LunaticError[] } };
	// Contains the errors for the current page / iteration
	currentErrors?: { [id: string]: LunaticError[] };
	// Errors
	modalErrors?: Record<string, LunaticError[]>;
	// Handler to call when updating a value
	handleChange: (
		response: { name: string },
		value: unknown,
		args: Record<string, unknown>
	) => void;
	// Run and expression using the value from the state
	executeExpression: <T = unknown>(
		expression: unknown,
		args?: {
			iteration?: number;
			linksIterations?: number[];
			logging?: () => void;
			bindingDependencies?: string[];
		}
	) => T;
	// Update the value collected for the variable
	updateBindings: (variableName: string, value: unknown) => unknown;
	management?: boolean;
	goToPage: (page: {
		page: string;
		iteration?: number;
		nbIterations?: number;
		subPage?: number;
		roundabout?: { page: string };
	}) => void;
};
