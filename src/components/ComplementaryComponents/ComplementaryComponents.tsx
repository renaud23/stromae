import { makeStyles } from '@codegouvfr/react-dsfr/tss'
import type { LunaticComponentType } from '@inseefr/lunatic/lib/src/components/type'

import { ComponentsRenderer } from '../ComponentsRenderer'
import { useLunaticContext } from '../orchestrator/hook/useLunaticContext'

const useStyles = makeStyles()({
  root: {
    padding: 0,
    '+ .lunatic-component-with-dsfr': {
      marginBottom: 0,
    },
  },
})

const only: LunaticComponentType[] = ['QuestionExplication']

/**
 * Components displayed at the bottom of the page
 * For instance QuestionExplication to show more detail about a question
 */
export function ComplementaryComponents() {
  const { getComponents, currentErrors, disabled = false } = useLunaticContext()
  const { classes, cx } = useStyles()

  if (!getComponents) {
    return null
  }

  const components = getComponents({ only })

  if (components.length === 0) {
    return null
  }

  return (
    <div
      id="complementary-components"
      className={cx(classes.root, 'fr-col-12')}
    >
      <ComponentsRenderer
        getComponents={getComponents}
        currentErrors={currentErrors}
        disabled={disabled}
        only={only}
      />
    </div>
  )
}
