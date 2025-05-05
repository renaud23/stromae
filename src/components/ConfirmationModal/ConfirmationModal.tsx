import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import { makeStyles } from '@codegouvfr/react-dsfr/tss'

import {
  ModalDsfr,
  ModalDsfrContent,
  ModalDsfrFooter,
} from '../ContinueOrRestartModal/ModalDsfr'
import {
  type UseLunaticType,
  useOrchestratorContext,
} from '../Orchestrator/hook/useOrchestratorContext'

const useStyles = makeStyles()({
  root: {
    '+ .lunatic-component-with-dsfr': {
      marginBottom: '2rem',
    },
  },
})

type ConfirmationType = {
  goToPage?: UseLunaticType['goToPage']
  description: ReactNode
  label: ReactNode
  backPage?: string
}

export function ConfirmationModal(props: ConfirmationType) {
  const { classes, cx } = useStyles()
  const { backPage } = props
  const [display, setDisplay] = useState(true)
  const { goToPage, goNextPage, goPreviousPage } = useOrchestratorContext()

  const onClose_ = useCallback(() => {
    setDisplay(false)
    goPreviousPage?.()
  }, [goPreviousPage])

  const onClose = useCallback(() => {
    setDisplay(false)
    goToPage?.({ page: backPage ?? '18' })
  }, [backPage, goToPage])

  const confirm = useCallback(() => {
    goNextPage?.()
  }, [goNextPage])

  if (!display) {
    return null
  }
  return (
    <div id="stromae-modals" className={cx(classes.root)}>
      <ModalDsfr close={onClose_}>
        <ModalDsfrContent>
          <h1 className="fr-modal__title">{props.label}</h1>
          {props.description}
        </ModalDsfrContent>
        <ModalDsfrFooter>
          <ul
            className={fr.cx(
              'fr-btns-group',
              'fr-btns-group--inline-md',
              'fr-btns-group--right',
            )}
          >
            <li>
              <button
                className={fr.cx('fr-btn', 'fr-btn--secondary')}
                onClick={onClose}
              >
                Je souhaite corriger
              </button>
            </li>
            <li>
              <button className={fr.cx('fr-btn')} onClick={confirm}>
                Je confirme
              </button>
            </li>
          </ul>
        </ModalDsfrFooter>
      </ModalDsfr>
    </div>
  )
}
