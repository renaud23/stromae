import { type StateData } from '../../typeStromae/type'
import { authenticatedPutRequest } from '../commons/axios-utils'
import { surveyUnitStateDataUrl } from './api'

export const putSurveyUnitStateData =
  (domain: string) => async (state: StateData, unit: string) => {
    try {
      await authenticatedPutRequest<StateData>(
        surveyUnitStateDataUrl(domain, unit),
        state,
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new Error('Impossible de sauvegarder SuData')
    }
  }
