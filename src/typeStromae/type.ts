import type { LunaticData } from '@inseefr/lunatic'

import type { HeaderType } from '../components/Header/HeaderType'
import type { FooterType } from '../components/footer/FooterType'

export enum CollectStatusEnum {
  Init = 'INIT',
  Completed = 'COMPLETED',
  Validated = 'VALIDATED',
}

export type StateData = {
  // 'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED' | null;
  state?: CollectStatusEnum | null
  date: number
  currentPage: string
}

export type PersonalizationElement = {
  name: string | 'bannerLabel' | 'bannerLabelDependencies'
  value: string | number | boolean | Array<string>
}

export type SurveyUnitData = {
  data: LunaticData
  stateData: StateData
  personalization?: Array<PersonalizationElement>
}

export type SavingFailure = { status: 200 | 400 | 500 }

export type DataVariables = Record<string, unknown>

type VariableValue = {
  EDITED: unknown
  FORCED: unknown
  PREVIOUS: unknown
  COLLECTED: unknown
}

export type VariablesType = {
  EXTERNAL: Record<string, VariableValue>
  COLLECTED: Record<string, VariableValue>
  CALCULATED: Record<string, VariableValue>
}

export type QuestionnaireParams = {
  survey: string
  unit?: string
}

export type LinkType = {
  title: string
  link: Record<string, string>
}

export type SubmitType = {
  DescriptionAdditional: string
  TitleAdditionalInformation: string
  Feedback: LinkType
  Results: LinkType
}

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
  type: OptionalPageElementsEnum
  id?: string
  className?: string
}

export type SectionElement = OptionalPageElement & {
  type: OptionalPageElementsEnum.Section
  title: string
  paragraphs: Record<string, unknown> | string
}

export type TitleElement = OptionalPageElement & {
  type: OptionalPageElementsEnum.Title
  title: string
}

export type LinkElement = OptionalPageElement & {
  type: OptionalPageElementsEnum.Link
  content: string
  href: string
  title: string
  target?: string
}

export type ListElement = OptionalPageElement & {
  type: OptionalPageElementsEnum.List
  items: Array<AcceptedElements & { element?: AcceptedElements }>
}

export type AcceptedElements =
  | TitleElement
  | LinkElement
  | ListElement
  | SectionElement

export type OptionalPage = Array<AcceptedElements>

export type WelcomeType = {
  Enq_LibelleEnquete: string
  Enq_ObjectifsCourts: string
  Enq_CaractereObligatoire: boolean
  Enq_QualiteStatistique: boolean
  Enq_NumeroVisa: string
  Enq_MinistereTutelle: string
  Enq_ParutionJo: boolean
  Enq_DateParutionJo: string
  Enq_RespOperationnel: string
  Enq_RespTraitement: string
  Enq_AnneeVisa: string
  Loi_statistique: { href: string; target: string }
  Loi_rgpd: { href: string; target: string }
  Loi_informatique: { href: string; target: string }
  whoAnswers: string[]
  Enq_Image?: string
  Enq_colorTheme?: string
  Enq_Faq_QuestionsAdditionnelles?: [{ question: string; contenu: string }]
}

export type MetadataSurvey = {
  Header: HeaderType
  Footer: FooterType
  Submit: SubmitType
  redirections: Record<string, string>
  errorPage: Record<string, string>
  refreshDataOnPages?: Array<string>
  Welcome?: WelcomeType
} & { optionalPages: Record<string, OptionalPage> }
