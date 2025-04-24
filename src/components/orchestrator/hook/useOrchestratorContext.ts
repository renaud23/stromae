import { createContext, useContext } from 'react'

import { useLunatic } from '@inseefr/lunatic'

import type {
  PersonalizationElement,
  SavingFailure,
  SurveyChange,
  SurveyUnitData,
} from '../../../typeStromae/type'

export type UseLunaticType = ReturnType<typeof useLunatic>

const nothingToDo = () => null

export type OrchestratorContext = {
  /**  functions and objects provided by useLunatic and used by nested component in several pages */
  goToPage: UseLunaticType['goToPage']
  goNextPage: UseLunaticType['goNextPage']
  compileControls: UseLunaticType['compileControls']
  goPreviousPage: UseLunaticType['goPreviousPage']
  getData: UseLunaticType['getData']
  pageTag: UseLunaticType['pageTag']
  getComponents: UseLunaticType['getComponents']
  isFirstPage: UseLunaticType['isFirstPage']
  isLastPage: UseLunaticType['isLastPage']

  /** states used for orchestrating the survey  */
  currentErrors?: ReturnType<UseLunaticType['compileControls']>
  waiting: boolean
  disabled?: boolean
  initialData?: SurveyUnitData
  currentChange?: SurveyChange
  savingFailure?: SavingFailure
  personalization?: PersonalizationElement[]

  criticality?: boolean
}

const OrchestratorContextInitial: OrchestratorContext = {
  goToPage: nothingToDo,
  goNextPage: nothingToDo,
  goPreviousPage: () => {},
  compileControls: () => ({ currentErrors: {}, isCritical: false }),
  getComponents: () => [],
  getData: () => ({ CALCULATED: {}, EXTERNAL: [], COLLECTED: [] }),
  pageTag: '1',
  initialData: undefined,
  savingFailure: undefined,
  criticality: undefined,
  personalization: undefined,
  isFirstPage: false,
  isLastPage: false,
  waiting: false,
  disabled: false,
  currentChange: undefined,
}

export const orchestratorContext = createContext(OrchestratorContextInitial)

export function useOrchestratorContext(): OrchestratorContext {
  return useContext(orchestratorContext)
}
