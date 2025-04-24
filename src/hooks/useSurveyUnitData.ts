import { useCallback } from 'react'

import { useRemote } from '../components/Orchestrator/hook/useRemote'
import { surveyApi } from '../lib/surveys/surveysApi'

export function useSurveyUnitData(unit?: string, onError = () => {}) {
  const getSurveyUnitData = useCallback(async () => {
    if (unit) {
      return surveyApi.getSurveyUnitData(unit)
    }
    return undefined
  }, [unit])

  return useRemote(getSurveyUnitData, onError)
}
