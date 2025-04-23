import { useCallback } from 'react'

import { useOidc } from '@axa-fr/react-oidc'
import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Information from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/information.svg?react'

import { useDocumentTitle } from '../../utils/useDocumentTitle'

export function SessionLost() {
  const { login } = useOidc()
  const onClick = useCallback(() => {
    login('/')
  }, [login])
  useDocumentTitle("Page d'authentification avec un navigateur non supporté")
  return (
    <div className={fr.cx('fr-container')} aria-live="polite" aria-busy="true">
      <div
        className={fr.cx(
          'fr-grid-row',
          'fr-grid-row--center',
          'fr-grid-row--middle',
        )}
        style={{ minHeight: '80vh' }}
      >
        <div className={fr.cx('fr-col-md-6', 'fr-col-12')}>
          <h1 className="">Vous avez été déconnecté.</h1>
          <p className={fr.cx('fr-mt-3w', 'fr-text--lead')}>
            Vos réponses ont été sauvegardées, vous pourrez ainsi compléter
            ultèrieurement votre questionnaire.
          </p>
          <Button size="large" onClick={onClick}>
            Se reconnecter
          </Button>
        </div>
        <div
          className={fr.cx(
            'fr-col-lg-3',
            'fr-col-offset-lg-1',
            'fr-col-12',
            'fr-mt-6w',
            'fr-col--middle',
          )}
        >
          <Information />
        </div>
      </div>
    </div>
  )
}
