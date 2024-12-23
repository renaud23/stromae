import { HeaderType } from '../components/Header/HeaderType';
import { WelcomeType } from '../components/Welcome/WelcomeType';
import { FooterType } from '../components/footer/FooterType';
import type { LunaticData, LunaticError } from '../typeLunatic/type';
import { ComponentType } from '../typeLunatic/type-source';

export enum CollectStatusEnum {
	Init = 'INIT',
	Completed = 'COMPLETED',
	Validated = 'VALIDATED',
}

export type StateData = {
	// 'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED' | null;
	state?: CollectStatusEnum | null;
	date: number;
	currentPage: string;
};

export type PersonalizationElement = {
	name: string | 'bannerLabel' | 'bannerLabelDependencies';
	value: string | number | boolean | Array<string>;
	bannerLabel?: string;
};

export type SurveyUnitData = {
	data: LunaticData;
	stateData: StateData;
	personalization?: Array<PersonalizationElement>;
};

export type SavingFailure = { status: 200 | 400 | 500 };

export type DataVariables = Record<string, unknown>;

export type AcceptedValues =
	| boolean
	| string
	| number
	| null
	| undefined
	| AcceptedValues[];

export type VariableValue = {
	EDITED: AcceptedValues;
	FORCED: AcceptedValues;
	PREVIOUS: AcceptedValues;
	COLLECTED: AcceptedValues;
};

export type VariablesType = {
	EXTERNAL: Record<string, VariableValue>;
	COLLECTED: Record<string, VariableValue>;
	CALCULATED: Record<string, VariableValue>;
};

/**
 * Comportements exposés par Lunatic pour intégration dans
 * l'orchestrateur.
 */
export type LunaticInterface = {
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
};

export type QuestionnaireParams = {
	survey: string;
	unit?: string;
};

export type LinkType = {
	title: string;
	link: Record<string, string>;
};

export type SubmitType = {
	DescriptionAdditional: string;
	TitleAdditionalInformation: string;
	Feedback: LinkType;
	Results: LinkType;
};

/*
 * MetadataSurvey avec ses types compatibles pour composer des pages optionnelles.
 */

export enum OptionalPageElementsEnum {
	Link = 'link',
	Title = 'title',
	Section = 'section',
	List = 'list',
}

export type OptionalPageElement = {
	type: OptionalPageElementsEnum;
	id?: string;
	className?: string;
};

export type SectionElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.Section;
	title: string;
	paragraphs: Object | string;
};

export type TitleElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.Title;
	title: string;
};

export type LinkElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.Link;
	content: string;
	href: string;
	title: string;
	target?: string;
};

export type ListElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.List;
	items: Array<AcceptedElements & { element?: AcceptedElements }>;
};

export type AcceptedElements =
	| TitleElement
	| LinkElement
	| ListElement
	| SectionElement;

export type OptionalPage = Array<AcceptedElements>;

export type EventHandler = {
	event: 'blur' | 'focus' | 'change' | 'click';
};

export type ParadataComponent = {
	id: string;
	events: Array<EventHandler['event']>;
};

export type ParadataType = {
	isActive: boolean;
	level: '1' | '2';
	components: Array<ParadataComponent> | [];
};

export type MetadataSurvey = {
	Header: HeaderType;
	Footer: FooterType;
	Submit: SubmitType;
	redirections: Record<string, string>;
	errorPage: Record<string, string>;
	refreshDataOnPages?: Array<string>;
	Welcome: WelcomeType;
	paradata: ParadataType;
} & { optionalPages: Record<string, OptionalPage> };
