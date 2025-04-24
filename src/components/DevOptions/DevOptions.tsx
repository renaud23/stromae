import { Button } from '@codegouvfr/react-dsfr/Button'

import { environment } from '../../utils/read-env-vars'
import { useOrchestratorContext } from '../Orchestrator/hook/useOrchestratorContext'

const { DEBUG } = environment

export function DevOptions() {
  const { getData } = useOrchestratorContext()
  function handleClick() {
    try {
      const variables = getData?.(false)
      console.log({ variables })
    } catch (e) {
      console.warn(e)
    }
  }
  if (DEBUG) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '5px',
          right: '5px',
          textAlign: 'center',
          fontSize: '8px',
        }}
      >
        <div>Only available when NODE_ENV === 'development'</div>
        <Button
          priority="primary"
          onClick={handleClick}
          title="get-data-for-dev-purpose"
          nativeButtonProps={{
            form: 'stromae-form',
            type: 'button',
          }}
          id="get-lunatic-data-button"
        >
          getData from Lunatic
        </Button>
      </div>
    )
  }
  return null
}
