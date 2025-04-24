import { type PropsWithChildren } from 'react'

import type { LunaticSource } from '@inseefr/lunatic'

import { surveyApi } from '../../lib/surveys'
import type { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type'
import { ContentSkeleton } from '../skeleton/Content'
import { useControls } from './hook/useControls'
import { useOrchestrator } from './hook/useOrchestrator'
import {
  type UseLunaticType,
  orchestratorContext,
} from './hook/useOrchestratorContext'

export type OrchestratorProps = {
  source: LunaticSource
  surveyUnitData: SurveyUnitData

  onChange?: UseLunaticType['onChange']
  getReferentiel?: (name: string) => Promise<Array<unknown>>
  activeControls?: boolean
  autoSuggesterLoading?: boolean
  features?: Array<string>
  preferences?: Array<string>
  savingType?: string
  paginated?: boolean
  disabled?: boolean
  metadata?: MetadataSurvey
  unit: string
}

export function OrchestratorReady({
  children,
  features,
  preferences,
  source,
  surveyUnitData,
  disabled,
  unit,
}: PropsWithChildren<OrchestratorProps>) {
  const initialData = surveyUnitData

  const {
    Provider,
    goToPage,
    goNextPage,
    compileControls,
    goPreviousPage,
    pageTag,
    getComponents,
    getData,
    isLastPage,
    isFirstPage,
    waiting,
    currentChange,
    savingFailure,
  } = useOrchestrator({
    source,
    features,
    preferences,
    surveyUnitData,
    unit,
    getReferentiel: surveyApi.getNomenclature,
    autoSuggesterLoading: true,
  })

  const {
    goNextPage: goNextPageWithControls,
    goPreviousPage: goPreviousPageWithControls,
    currentErrors,
    criticality,
  } = useControls({ goNextPage, goPreviousPage, pageTag, compileControls })

  return (
    <Provider>
      <orchestratorContext.Provider
        value={{
          goToPage,
          goNextPage: goNextPageWithControls,
          compileControls,
          goPreviousPage: goPreviousPageWithControls,
          pageTag,
          getComponents,
          isLastPage,
          isFirstPage,
          waiting,
          currentErrors,
          disabled,
          initialData,
          currentChange,
          savingFailure,
          getData,
          criticality,
          personalization: initialData?.personalization,
        }}
      >
        {children}
      </orchestratorContext.Provider>
    </Provider>
  )
}

/**
 *
 * @param param0
 * @returns
 */
export function Orchestrator({
  children,
  features,
  preferences,
  source,
  surveyUnitData,
  unit,
}: PropsWithChildren<Partial<OrchestratorProps>>) {
  if (source && surveyUnitData && unit) {
    return (
      <OrchestratorReady
        source={source}
        surveyUnitData={surveyUnitData}
        features={features}
        preferences={preferences}
        disabled={false}
        unit={unit}
      >
        {children}
      </OrchestratorReady>
    )
  }

  return <ContentSkeleton />
}
