import { fr } from '@codegouvfr/react-dsfr'

import { ContentSkeleton } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'

export function LayoutSkeleton() {
  return (
    <div className={fr.cx('fr-container')} aria-live="polite" aria-busy="true">
      <title>Page en cours de chargement</title>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
        <Header />
        <ContentSkeleton />
        <Footer />
      </div>
    </div>
  )
}
