import { fr } from '@codegouvfr/react-dsfr'
import Error from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/error.svg?react'

import { useDocumentTitle } from '../../utils/useDocumentTitle'

export function AuthenticatingError() {
  useDocumentTitle("Page d'échec d'authentification")
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
          <h1 className="">Echec de l'authentification.</h1>
          <p>
            Une erreur s'est produite pendant votre authentification. Veuillez
            réessayer de vous connecter au questionnaire.
          </p>
          <a href="/" className="fr-btn">
            Se reconnecter
          </a>
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
          <Error />
        </div>
      </div>
    </div>
  )
}
