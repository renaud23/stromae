import { useCallback, useEffect, useRef, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'

import { useLunaticContext } from '../orchestrator/useLunaticContext'
import { ModalDsfr, ModalDsfrContent, ModalDsfrFooter } from './ModalDsfr'

export function ContinueOrRestartModal() {
  const { goToPage, initialData } = useLunaticContext()
  const last = useRef<HTMLButtonElement>(null)
  const pageFromAPI = initialData?.stateData.currentPage
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (pageFromAPI && pageFromAPI !== '1') {
      setDisplay(true)
    }
  }, [pageFromAPI])

  function onClose() {
    setDisplay(false)
  }

  const onContinue = useCallback(() => {
    if (!pageFromAPI) {
      return
    }
    goToPage?.({ page: pageFromAPI })
    setDisplay(false)
  }, [pageFromAPI, goToPage])

  const onRestart = useCallback(() => {
    goToPage?.({ page: '1' })
    setDisplay(false)
  }, [goToPage])

  if (!display) {
    return null
  }
  return (
    <ModalDsfr
      id="start-or-continue"
      close={onClose}
      last={last.current as HTMLElement}
    >
      <ModalDsfrContent>
        <h1 className={fr.cx('fr-modal__title')} id="fr-modal-title-modal-1">
          Bienvenue
        </h1>
        <p>
          Vous avez déjà commencé à renseigner le questionnaire. Souhaitez-vous
          reprendre là où vous en étiez ou revenir à la première page ?
        </p>
      </ModalDsfrContent>
      <ModalDsfrFooter>
        <ul className={fr.cx('fr-btns-group', 'fr-btns-group--inline-md')}>
          <li>
            <button
              className={fr.cx('fr-btn', 'fr-btn--secondary')}
              onClick={onRestart}
            >
              Revenir à la première page
            </button>
          </li>
          <li>
            <button className={fr.cx('fr-btn')} onClick={onContinue} ref={last}>
              Reprendre là où j'en étais
            </button>
          </li>
        </ul>
      </ModalDsfrFooter>
    </ModalDsfr>
  )
}
