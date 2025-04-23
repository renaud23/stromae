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

export type LunaticContext = {
  goToPage: UseLunaticType['goToPage']
  goNextPage: UseLunaticType['goNextPage']
  compileControls: UseLunaticType['compileControls']
  goPreviousPage: UseLunaticType['goPreviousPage']
  getData: UseLunaticType['getData']
  pageTag: UseLunaticType['pageTag']
  getComponents: UseLunaticType['getComponents']
  isFirstPage: UseLunaticType['isFirstPage']
  isLastPage: UseLunaticType['isLastPage']
  currentErrors?: ReturnType<UseLunaticType['compileControls']>

  /* */
  waiting: boolean
  disabled?: boolean
  initialData?: SurveyUnitData
  currentChange?: SurveyChange
  savingFailure?: SavingFailure
  personalization?: PersonalizationElement[]

  criticality?: boolean
}

const LunaticContextInitial: LunaticContext = {
  goToPage: nothingToDo,
  goNextPage: nothingToDo,
  goPreviousPage: () => {},
  compileControls: () => ({ currentErrors: {}, isCritical: false }),
  getComponents: () => [],
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
  getData: () => ({ CALCULATED: {}, EXTERNAL: [], COLLECTED: [] }),
}

export const lunaticContext = createContext(LunaticContextInitial)

export function useLunaticContext(): LunaticContext {
  return useContext(lunaticContext)
}
