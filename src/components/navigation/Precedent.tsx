import { useEffect, useRef } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'

import { usePrevious } from '../../lib/commons/usePrevious'
import { useOrchestratorContext } from '../Orchestrator/hook/useOrchestratorContext'

export function Precedent() {
  const { goPreviousPage, isFirstPage, pageTag, getComponents } =
    useOrchestratorContext()

  const buttonRef = useRef<HTMLButtonElement>(null)
  const previousPage = usePrevious<string>(pageTag)

  useEffect(() => {
    if (pageTag !== previousPage) {
      const components = getComponents()
      const hasConfirmationModal = components.some(
        (component) => component.componentType === 'ConfirmationModal',
      )
      if (hasConfirmationModal) {
        const cancelButtons = Array.from(
          document.querySelectorAll('button[value="cancel"]'),
        )

        const handleCancelClick = () => {
          setTimeout(() => {
            const continueButton = document.getElementById('continue-button')
            continueButton?.focus()
            cancelButtons.forEach((cancelButton) => {
              cancelButton.removeEventListener('click', handleCancelClick)
            })
          }, 0)
        }

        cancelButtons.forEach((cancelButton) => {
          cancelButton.addEventListener('click', handleCancelClick)
        })
      }
    }
    return () => {}
  }, [pageTag, previousPage, getComponents])

  function handleClick() {
    goPreviousPage()
  }

  if (!isFirstPage) {
    return (
      <div className={fr.cx('fr-col-12')}>
        <div className={fr.cx('fr-container')}>
          <Button
            id="button-precedent"
            title="Revenir à l'étape précédente"
            priority="tertiary no outline"
            iconId="fr-icon-arrow-left-line"
            onClick={handleClick}
            ref={buttonRef}
          >
            Précédent
          </Button>
        </div>
      </div>
    )
  }

  return null
}
