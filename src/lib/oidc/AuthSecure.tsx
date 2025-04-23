import type { PropsWithChildren } from 'react'

import { OidcSecure as OidcSecureAxa } from '@axa-fr/react-oidc'

import { AuthTypeEnum, environment } from '../../utils/read-env-vars'

const { AUTH_TYPE } = environment

export function AuthSecure({ children }: PropsWithChildren) {
  if (AUTH_TYPE === AuthTypeEnum.Oidc)
    return <OidcSecureAxa>{children}</OidcSecureAxa>
  return <>{children}</>
}

export function OidcSecure({ children }: PropsWithChildren) {
  return <OidcSecureAxa>{children}</OidcSecureAxa>
}
