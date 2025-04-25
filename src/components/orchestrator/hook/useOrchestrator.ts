import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { type LunaticSource, useLunatic } from '@inseefr/lunatic'
import * as custom from '@inseefr/lunatic-dsfr'

import { usePrevious } from '../../../lib/commons/usePrevious'
import { surveyApi } from '../../../lib/surveys'
import {
  CollectStatusEnum,
  type MetadataSurvey,
  type PersonalizationElement,
  type SavingFailure,
  type SurveyChange,
  type SurveyUnitData,
} from '../../../typeStromae/type'
import { ConfirmationModal as Modal } from '../../ConfirmationModal/ConfirmationModal'
import { useQuestionnaireTitle } from './useQuestionnaireTitle'
import { useRedirectIfAlreadyValidated } from './useRedirectIfAlreadyValidated'
import { useSaving } from './useSaving'

const CUSTOM = { ...custom, Modal }

type useOrchestratorParams = {
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
  initialPage?: string
}

function createPersonalizationMap(
  personalization: Array<PersonalizationElement>,
) {
  return personalization.reduce((acc, { name, value }) => {
    return { ...acc, [name]: value }
  }, {})
}

export type PersonalizationMap = Record<string, unknown> & {
  bannerLabelDependencies?: string | number | boolean | Array<string>
}

function useMeoizedFirstRef<T>(reference: T) {
  const hook = useRef<T>(undefined)

  useEffect(() => {
    if (reference && hook.current === undefined) {
      hook.current = reference
    }
  }, [reference])

  return hook.current
}

function focusFirstLegend() {
  ;(
    document
      .getElementById('stromae-form')
      ?.getElementsByTagName('legend')[0] as HTMLElement
  )?.focus()
}

/**
 * Logique d'orchestration du questionnaire.
 *
 * @param params
 * @returns
 */
export function useOrchestrator(params: useOrchestratorParams) {
  const {
    source,
    surveyUnitData,
    preferences,
    features,
    savingType,
    autoSuggesterLoading,
    paginated,
    metadata,
    unit,
    initialPage,
  } = params

  const [waiting, setWaiting] = useState(false)

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
      initialPage,
    }),
    [
      getReferentiel,
      preferences,
      features,
      savingType,
      autoSuggesterLoading,
      onChange,
      paginated,
      initialPage,
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

  const getData_ = useMeoizedFirstRef(getData)

  const defaultTitle = metadata?.Header?.serviceTitle
  useQuestionnaireTitle({
    source,
    page: pager.page,
    defaultTitle:
      typeof defaultTitle === 'string' ? defaultTitle : 'Enquête Insee',
  })

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

  // Sauvegarde au changement revolu de page .
  const previousPageTag = usePrevious(pageTag)
  const isNewPage =
    pageTag !== undefined &&
    previousPageTag !== undefined &&
    previousPageTag !== pageTag
  if (isNewPage && shouldSync.current) {
    shouldSync.current = false
    saveChange({ pageTag, getData })
    focusFirstLegend()
  }

  return {
    Provider,
    goToPage,
    goNextPage: handleGoNext,
    compileControls,
    goPreviousPage: handleGoBack,
    getData: getData_,
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
