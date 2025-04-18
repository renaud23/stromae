import type { PropsWithChildren } from 'react'

import { fr } from '@codegouvfr/react-dsfr'

interface MainProps extends PropsWithChildren {
  id: string
}

export function Main({ children, id }: MainProps) {
  return (
    <main id={id} role="main">
      <div className={fr.cx('fr-container--fluid')}>
        <div
          className={fr.cx(
            'fr-grid-row',
            'fr-grid-row--center',
            'fr-grid-row--middle',
          )}
        >
          {children}
        </div>
      </div>
    </main>
  )
}
