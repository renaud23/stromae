import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving'
import { AlertesControles } from '../../components/AlertesControles'
import { ComplementaryComponents } from '../../components/ComplementaryComponents/ComplementaryComponents'
import { ContinueOrRestartModal } from '../../components/ContinueOrRestartModal/ContinueOrRestartModal'
import { DevOptions } from '../../components/DevOptions'
import { DraftBanner } from '../../components/DraftBanner/DraftBanner'
import { Grid } from '../../components/Grid/Grid'
import { Formulaire } from '../../components/formulaire'
import { Layout } from '../../components/layout'
import { Continuer } from '../../components/navigation/Continuer'
import { Precedent } from '../../components/navigation/Precedent'
import { Orchestrator } from '../../components/orchestrator'
import { AuthSecure } from '../../lib/oidc'
import { useDocumentTitle } from '../../utils/useDocumentTitle'

export type QuestionnaireParams = {
  survey?: string
  unit?: string
}

const FEATURES = ['VTL', 'MD']
const COLLECTED = 'COLLECTED'

export function Questionnaire() {
  useDocumentTitle('Questionnaire')

  return (
    <AuthSecure>
      <Layout>
        <Orchestrator features={FEATURES} savingType={COLLECTED}>
          <DraftBanner />
          <ContinueOrRestartModal />
          <Precedent />
          <Grid>
            <AlertesSaving />
            <AlertesControles />
            <Formulaire />
            <Continuer />
          </Grid>
          <ComplementaryComponents />
          <DevOptions />
        </Orchestrator>
      </Layout>
    </AuthSecure>
  )
}
