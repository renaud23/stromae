import type { LunaticSource } from '@inseefr/lunatic'
import moize from 'moize'

import { authenticatedGetRequest } from '../commons/axios-utils'
import { surveySource } from './api'

/**
 * An endpoint to stromae-api for retrieving resource URLs.
 */
export const getSurvey = (BASE_URL: string) =>
  moize(
    (survey: string, token?: string): Promise<LunaticSource> => {
      return authenticatedGetRequest<LunaticSource>(
        surveySource(BASE_URL, survey),
        token,
      )
    },
    { isPromise: true },
  )
