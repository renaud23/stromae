import type { UseLunaticType } from '../Orchestrator/hook/useOrchestratorContext'
import { ErrorMessage } from './ErrorMessage'

type Props = {
  currentErrors: ReturnType<UseLunaticType['compileControls']>
}

export function AlertesContent({ currentErrors }: Props) {
  const messages = Object.values(currentErrors?.currentErrors ?? {})

  if (messages.length) {
    return messages.flat().map(({ errorMessage, id }) => {
      return <ErrorMessage key={id} errorMessage={errorMessage} />
    })
  }
  return null
}
