import type { LunaticComponentType } from '@inseefr/lunatic/lib/src/components/type'

import { ComponentsRenderer } from '../ComponentsRenderer'
import { useOrchestratorContext } from '../Orchestrator/hook/useOrchestratorContext'
import { Form } from '../skeleton/Form'
import { useStyles } from './useStyle'

const except: LunaticComponentType[] = ['QuestionExplication']

export function Formulaire() {
  const {
    waiting,
    isLastPage,
    pageTag,
    getComponents,
    goToPage,
    goNextPage,
    currentErrors,
    disabled,
  } = useOrchestratorContext()

  const { classes, cx } = useStyles()
  if (waiting && !isLastPage) {
    return <Form />
  }

  return (
    <form id="stromae-form" className={cx(classes.root)}>
      <ComponentsRenderer
        focusKey={pageTag}
        getComponents={getComponents}
        goToPage={goToPage}
        goNextPage={goNextPage}
        currentErrors={currentErrors}
        disabled={disabled}
        except={except}
      />
    </form>
  )
}
