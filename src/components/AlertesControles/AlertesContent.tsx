import type { LunaticError } from '@inseefr/lunatic'

import { ErrorMessage } from './ErrorMessage'

type Props = {
  currentErrors: Record<string, LunaticError[]>
}

export function AlertesContent({ currentErrors }: Props) {
  if (Array.isArray(currentErrors)) {
    return Object.values(currentErrors)
      .flat()
      .map(({ errorMessage, id }) => {
        return <ErrorMessage key={id} errorMessage={errorMessage} />
      })
  }
  return null
}
