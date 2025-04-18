import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import type { HeaderProps } from '@codegouvfr/react-dsfr/Header'

import type { LinkProps } from '../footer/FooterType'

export type HeaderType = HeaderProps & {}

export type QuickAccessItems = {
  buttonProps: ButtonProps
  iconId: string
  linkProps: LinkProps
  text: string
}
