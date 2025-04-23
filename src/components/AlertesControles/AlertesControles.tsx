import { useEffect, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import type { FilledLunaticComponentProps } from '@inseefr/lunatic/lib/src/use-lunatic/commons/fill-components/fill-components'

import { useLunaticContext } from '../orchestrator/hook/useLunaticContext'
import { AlertesContent } from './AlertesContent'

function checkIfIsRoundAbout(components?: FilledLunaticComponentProps[]) {
  if (Array.isArray(components)) {
    return components.reduce(
      (status, { componentType }) => status || componentType === 'Roundabout',
      false,
    )
  }
  return true
}

export function AlertesControles() {
  const { currentErrors, criticality, getComponents } = useLunaticContext()
  const type = criticality ? 'fr-alert--error' : 'fr-alert--warning'
  const [isInRoundabout, setIsRoundabout] = useState(false)

  useEffect(() => {
    if (currentErrors) {
      document.getElementById('alert-errors')?.focus()
    }
  }, [currentErrors])

  useEffect(() => {
    setIsRoundabout(checkIfIsRoundAbout(getComponents?.()))
  }, [getComponents])

  if (currentErrors && isInRoundabout) {
    return (
      <div
        aria-labelledby="alertHeading"
        aria-describedby="alertText"
        id="alert-errors"
        className={fr.cx('fr-alert', type, 'fr-mb-3w')}
        role="alert"
        tabIndex={-1}
      >
        <h3 id="alertHeading" className={fr.cx('fr-alert__title')}>
          Il y a un problème
        </h3>
        <AlertesContent currentErrors={currentErrors} />
      </div>
    )
  }
  return null
}
