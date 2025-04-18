import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { type LunaticSource, useLunatic } from '@inseefr/lunatic'
import * as custom from '@inseefr/lunatic-dsfr'

import { usePrevious } from '../../lib/commons/usePrevious'
import { surveyApi } from '../../lib/surveys'
import { CollectStatusEnum } from '../../typeStromae/type'
import type {
  MetadataSurvey,
  PersonalizationElement,
  SavingFailure,
  SurveyUnitData,
} from '../../typeStromae/type'
import { ConfirmationModal as Modal } from '../ConfirmationModal/ConfirmationModal'
import type { SurveyChange } from './Orchestrator'
import { useQuestionnaireTitle } from './useQuestionnaireTitle'
import { useRedirectIfAlreadyValidated } from './useRedirectIfAlreadyValidated'
import { useSaving } from './useSaving'

const CUSTOM = { ...custom, Modal }

//

export type useOrchestratorParams = {
  source: LunaticSource
  surveyUnitData: SurveyUnitData

  onChange?: (...args: Array<unknown>) => void
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

export function createPersonalizationMap(
  personalization: Array<PersonalizationElement>,
) {
  return personalization.reduce((acc, { name, value }) => {
    return { ...acc, [name]: value }
  }, {})
}

export type PersonalizationMap = Record<string, unknown> & {
  bannerLabelDependencies?: string | number | boolean | Array<string>
}

export function useOrchestrator(params: useOrchestratorParams) {
  const {
    source,
    surveyUnitData,
    preferences,
    features,
    savingType,
    autoSuggesterLoading,
    paginated,
    // disabled,
    metadata,
    unit,
  } = params

  const [waiting, setWaiting] = useState(false)
  // const [onSaving, setOnSaving] = useOptimistic(false);
  const [failure, setFailure] = useState<SavingFailure>()
  const { data, stateData, personalization = [] } = surveyUnitData ?? {}
  const [currentChange, setCurrentChange] = useState<SurveyChange>()
  const personalizationMap = useMemo<
    Record<string, string | number | boolean | Array<string>>
  >(() => createPersonalizationMap(personalization), [personalization])
  const { state } = stateData ?? {}

  const shouldSync = useRef(false)
  const initialCollectStatus = state ?? CollectStatusEnum.Init

  useRedirectIfAlreadyValidated(initialCollectStatus)

  const { listenChange, saveChange } = useSaving({
    setWaiting,
    setFailure,
    initialCollectStatus,
    unit,
  })

  const onChange = useCallback(
    ({ name }: { name: string }, value: unknown) => {
      listenChange(name, value)
      setCurrentChange({ name })
    },
    [listenChange],
  )

  const getReferentiel = useCallback(async (name: string) => {
    try {
      return surveyApi.getNomenclature(name)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new Error(`Fail to load store ${name}`)
    }
  }, [])

  const args = useMemo<Record<string, unknown>>(
    () => ({
      getReferentiel,
      custom: CUSTOM,
      preferences,
      features,
      savingType,
      autoSuggesterLoading,
      workersBasePath: `${window.location.origin}/workers`,
      onChange,
      paginated,
    }),
    [
      getReferentiel,
      preferences,
      features,
      savingType,
      autoSuggesterLoading,
      onChange,
      paginated,
    ],
  )

  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    isFirstPage,
    isLastPage,
    goToPage,
    getData,
    Provider,
    compileControls,
    pageTag,
    pager,
  } = useLunatic(source, data, args)

  useEffect(() => {
    ;(
      document
        .getElementById('stromae-form')
        ?.getElementsByTagName('legend')[0] as HTMLElement
    )?.focus()
  }, [pager])

  const defaultTitle = metadata?.Header?.serviceTitle
  useQuestionnaireTitle({
    source,
    page: pager.page,
    defaultTitle:
      typeof defaultTitle === 'string' ? defaultTitle : 'Enquête Insee',
  })

  // Gestion de la sauvegarde : tout ce qui était dans le composant Save
  const previousPageTag = usePrevious(pageTag)
  const isNewPage =
    pageTag !== undefined &&
    previousPageTag !== undefined &&
    previousPageTag !== pageTag

  const handleGoNext = useCallback(() => {
    setFailure(undefined)
    if (isLastPage) {
      saveChange({ pageTag, getData })
    } else {
      shouldSync.current = true
      goNextPage?.()
    }
  }, [goNextPage, isLastPage, saveChange, pageTag, getData])

  const handleGoBack = useCallback(() => {
    setFailure(undefined)
    shouldSync.current = true
    goPreviousPage?.()
  }, [goPreviousPage])

  if (isNewPage && shouldSync.current) {
    shouldSync.current = false
    saveChange({ pageTag, getData })
  }

  return {
    Provider,
    goToPage,
    goNextPage: handleGoNext,
    compileControls,
    goPreviousPage: handleGoBack,
    getData,
    pageTag,
    isLastPage,
    isFirstPage,
    getComponents,
    waiting,
    currentChange,
    savingFailure: failure,
    personalization: personalizationMap,
  }
}
