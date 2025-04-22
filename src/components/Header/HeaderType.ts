import type { FrIconClassName } from '@codegouvfr/react-dsfr'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import type { HeaderProps } from '@codegouvfr/react-dsfr/Header'
import type { RegisteredLinkProps } from '@codegouvfr/react-dsfr/link'
import type { To } from 'react-router'

export type HeaderType = HeaderProps & {}

export type QuickAccessItems = {
  buttonProps: ButtonProps
  iconId: FrIconClassName
  linkProps: RegisteredLinkProps & { href: To }
  text: string
}
