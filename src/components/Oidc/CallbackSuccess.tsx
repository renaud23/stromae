import { fr } from '@codegouvfr/react-dsfr'
import Success from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/success.svg?react'

import { useDocumentTitle } from '../../utils/useDocumentTitle'

export function CallbackSuccess() {
  useDocumentTitle('Page de chargement vers le questionnaire')
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
        <div className={fr.cx('fr-col-md-6', 'fr-col-12', 'fr-col--middle')}>
          <h1 className="">Authentification réussie.</h1>
          <p>Vous allez être redirigé vers le questionnaire.</p>
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
          <Success />
        </div>
      </div>
    </div>
  )
}
