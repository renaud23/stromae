import { useCallback } from 'react'

import { useRemote } from '../components/Orchestrator/hook/useRemote'
import { surveyApi } from '../lib/surveys/surveysApi'

export function useSurvey(survey?: string, onError = () => {}) {
  const getSurvey = useCallback(async () => {
    if (survey) {
      return surveyApi.getSurvey(survey)
    }
    return undefined
  }, [survey])

  const lunaticSource = useRemote(getSurvey, onError)

  return lunaticSource
}
