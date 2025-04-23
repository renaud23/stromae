import { useEffect, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'

import { useAuthentification } from '../orchestrator/useAuthentification'
import { HeaderMenuDescktop } from './HeaderMenuDesktop'
import { HeaderMenuMobile } from './HeaderMenuMobile'
import { type HeaderType } from './HeaderType'
import { ParametresAffichage } from './ParametresAffichage'

function getAuthLabel(isAuthenticated: boolean): string {
  if (isAuthenticated) {
    return 'Me déconnecter'
  }
  return 'Me connecter'
}

export type HeaderProps = {
  header?: HeaderType
  readonly handleOidcAuth?: () => void
  isAuthenticated?: boolean
}

export function Header(props: HeaderProps) {
  const { header } = props
  const { loginOrLogout, isAuthenticated } = useAuthentification()
  const [quickAccessItems, setQuickAccessItems] = useState<Array<any>>([])

  useEffect(() => {
    const others = header?.quickAccessItems || []
    setQuickAccessItems([
      ...others,
      {
        iconId: 'fr-icon-lock-line',
        buttonProps: {
          onClick: loginOrLogout,
        },
        text: getAuthLabel(isAuthenticated),
      },
    ])
  }, [isAuthenticated, loginOrLogout, header])

  return (
    <>
      <header role="banner" className={fr.cx('fr-header')} id="header">
        <HeaderMenuDescktop
          header={header}
          quickAccessItems={quickAccessItems}
        />
        <HeaderMenuMobile quickAccessItems={quickAccessItems} />
      </header>
      <ParametresAffichage />
    </>
  )
}
