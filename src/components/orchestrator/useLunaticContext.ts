import { useLunatic } from '@inseefr/lunatic';
import { createContext, useContext } from 'react';
import { ComponentType, LunaticError } from '../../typeLunatic/type-source';
import { SavingFailure, SurveyUnitData } from '../../typeStromae/type';
import { SurveyChange } from './Orchestrator';
import { PersonalizationMap } from './useOrchestrator';

export type UseLunaticContext = ReturnType<typeof useLunatic>;

const nothingToDo = () => null;

type UseLunaticInterface = {
	goToPage: (args: { page: string }) => void;
	goNextPage: () => void;
	compileControls: () => unknown;
	goPreviousPage: () => void;
	pageTag: string;
	getComponents: (args?: { only?: Array<string> }) => ComponentType[];
	isFirstPage: boolean;
	isLastPage: boolean;
	waiting: boolean;
	currentErrors?: Record<string, LunaticError[]>;
	disabled: boolean;
	initialData?: SurveyUnitData;
	currentChange: SurveyChange;
	savingFailure: SavingFailure;
	personalization: PersonalizationMap;
	getData: (arg?: boolean) => Record<string, unknown>;
	criticality?: boolean;
};

const LunaticContextInitial: UseLunaticContext = {
	goToPage: nothingToDo,
	goNextPage: nothingToDo,
	compileControls: nothingToDo,
	goPreviousPage: nothingToDo,
	pageTag: undefined,
	initialData: undefined,
	savingFailure: undefined,
	personalization: undefined,
	criticality: undefined,
};

export const lunaticContext = createContext(LunaticContextInitial);

export function useLunaticContext(): UseLunaticInterface {
	const all = useContext(lunaticContext);
	return all;
}
