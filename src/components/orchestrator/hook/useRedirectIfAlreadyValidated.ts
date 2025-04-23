import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router'

import { uri404, uriPostEnvoi } from '../../../lib/domainUri'
import { CollectStatusEnum } from '../../../typeStromae/type'

/**
 * If collectStatus === Validated redirect user
 * to the postSubmit page.
 *
 */
export function useRedirectIfAlreadyValidated(collectStatus?: string) {
  const { unit, survey } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (collectStatus === CollectStatusEnum.Validated) {
      if (unit && survey) {
        navigate(uriPostEnvoi(survey, unit))
      } else {
        navigate(uri404())
      }
    }
  }, [collectStatus, navigate, unit, survey])
}
