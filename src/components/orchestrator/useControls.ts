import { useCallback, useEffect, useState } from 'react'

import type { LunaticError } from '@inseefr/lunatic'

import type { UseLunaticType } from './useLunaticContext'

type UseControlsParams = {
  goNextPage: () => void
  goPreviousPage: () => void
  pageTag: UseLunaticType['pageTag']
  compileControls: UseLunaticType['compileControls']
}

export function useControls({
  goNextPage,
  goPreviousPage,
  pageTag,
  compileControls,
}: UseControlsParams) {
  const [currentErrors, setCurrentErrors] =
    useState<ReturnType<UseLunaticType['compileControls']>>()
  const [warning, setWarning] = useState<boolean>(false)
  const [criticality, setCriticality] = useState<boolean>()
  const [refreshControls, setRefreshControls] = useState(false)

  useEffect(() => {
    if (!(currentErrors?.currentErrors?.roundabout && pageTag?.includes('#'))) {
      return
    }
    setWarning(false)
    setCurrentErrors(undefined)
    setCriticality(false)
  }, [pageTag, currentErrors])

  const handleGoNext = useCallback(() => {
    let errors: ReturnType<UseLunaticType['compileControls']>
    if (compileControls) {
      errors = compileControls()

      setRefreshControls(false)
      if (warning && !refreshControls) {
        setWarning(false)
        setCurrentErrors(undefined)
        setCriticality(false)
        goNextPage()
      } else if (errors) {
        setCriticality(errors.isCritical)
        setCurrentErrors(errors)
        if (errors.currentErrors && !errors.isCritical) {
          setWarning(true)
        } else if (!errors.currentErrors) {
          setWarning(false)
          goNextPage()
        }
      } else {
        goNextPage()
      }
    }
  }, [compileControls, warning, refreshControls, goNextPage])

  return {
    goNextPage: handleGoNext,
    goPreviousPage,
    criticality,
    currentErrors,
  }
}
