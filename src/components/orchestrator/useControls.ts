import { useCallback, useEffect, useState } from 'react'

import { type LunaticError } from '../../typeLunatic/type-source'

type UseControlsParams = {
  goNextPage: () => void
  goPreviousPage: () => void
  pageTag: any
  compileControls: () => {
    isCritical: boolean
    currentErrors: Record<string, LunaticError[]>
  }
}

export function useControls({
  goNextPage,
  goPreviousPage,
  pageTag,
  compileControls,
}: UseControlsParams) {
  const [currentErrors, setCurrentErrors] =
    useState<Record<string, LunaticError[]>>()
  const [warning, setWarning] = useState<boolean>(false)
  const [criticality, setCriticality] = useState<boolean>()
  const [refreshControls, setRefreshControls] = useState(false)

  useEffect(() => {
    if (!(currentErrors?.roundabout && pageTag?.includes('#'))) {
      return
    }
    setWarning(false)
    setCurrentErrors(undefined)
    setCriticality(false)
  }, [pageTag, currentErrors])

  const handleGoNext = useCallback(() => {
    let errors
    if (compileControls) {
      errors = compileControls()
    }
    setRefreshControls(false)
    if (warning && !refreshControls) {
      setWarning(false)
      setCurrentErrors(undefined)
      setCriticality(false)
      goNextPage()
    } else if (errors) {
      setCriticality(errors.isCritical)
      setCurrentErrors(errors.currentErrors)
      if (errors.currentErrors && !errors.isCritical) {
        setWarning(true)
      } else if (!errors.currentErrors) {
        setWarning(false)
        goNextPage()
      }
    } else {
      goNextPage()
    }
  }, [compileControls, warning, refreshControls, goNextPage])

  return {
    goNextPage: handleGoNext,
    goPreviousPage,
    criticality,
    currentErrors,
  }
}
