import { Alert } from '@codegouvfr/react-dsfr/Alert'
import { fr } from '@codegouvfr/react-dsfr/fr'

import { useOrchestratorContext } from '../Orchestrator/hook/useOrchestratorContext'

export function AlertesSaving() {
  const { savingFailure } = useOrchestratorContext()
  if (savingFailure) {
    const { status } = savingFailure
    if (status === 500) {
      return (
        <Alert
          className={fr.cx('fr-mb-3w')}
          closable
          description="Vos données n'ont pu être sauvegardées, veuillez réessayer."
          severity="error"
          title="Une erreur est survenue lors de la sauvegarde de vos données"
        />
      )
    }
  }
  return null
}
