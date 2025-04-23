import { fr } from '@codegouvfr/react-dsfr'
import System from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/system.svg?react'

import { useDocumentTitle } from '../../utils/useDocumentTitle'

export function ServiceWorkerNotSupported() {
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
          <h1 className="">
            Vous ne pouvez pas vous connecter au questionnaire avec ce
            navigateur.
          </h1>
          <p>
            Votre navigateur n'est pas sécurisé. Veuillez le mettre à jour ou
            utiliser un navigateur plus récent.
          </p>
        </div>
        <div
          className={fr.cx(
            'fr-col-offset-lg-1',
            'fr-col-12',
            'fr-mt-6w',
            'fr-col--middle',
          )}
        >
          <System />
        </div>
      </div>
    </div>
  )
}
