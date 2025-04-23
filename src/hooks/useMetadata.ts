import { useCallback } from 'react'

import { useRemote } from '../components/orchestrator/hook/useRemote'
import { surveyApi } from '../lib/surveys/surveysApi'

export function useMetadata(survey?: string, onError = () => {}) {
  const getMetadata = useCallback(async () => {
    if (survey) {
      return surveyApi.getMetadataSurvey(survey)
    }
    return undefined
  }, [survey])

  const metadata = useRemote(getMetadata, onError)

  return metadata
}
