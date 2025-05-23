import { type PropsWithChildren } from 'react'

import { LunaticComponents } from '@inseefr/lunatic'
import * as lunatic from '@inseefr/lunatic'
import type { LunaticComponentType } from '@inseefr/lunatic/lib/src/components/type'
import type { FilledLunaticComponentProps } from '@inseefr/lunatic/lib/src/use-lunatic/commons/fill-components/fill-components'

import type { OrchestratorContext } from '../Orchestrator/hook/useOrchestratorContext'
import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer'

type ComponentsRendererProps = {
  only?: LunaticComponentType[]
  except?: LunaticComponentType[]
  // Key that trigger a new autofocus on the first field
  focusKey?: string
} & Partial<
  Pick<
    OrchestratorContext,
    'getComponents' | 'currentErrors' | 'disabled' | 'goToPage' | 'goNextPage'
  >
>

export function ComponentsRenderer(props: ComponentsRendererProps) {
  const {
    getComponents,
    currentErrors,
    disabled = false,
    only,
    except,
    focusKey,
    ...rest
  } = props

  const validComponents =
    getComponents?.({ only, except }).filter(
      (c) => c.componentType in lunatic,
    ) ?? []

  return (
    <LunaticComponents
      autoFocusKey={computeFocusKey(focusKey, currentErrors)}
      components={validComponents}
      componentProps={() => ({
        ...rest,
        errors: currentErrors?.currentErrors,
        disabled,
      })}
      wrapper={({
        children,
        id,
      }: PropsWithChildren<FilledLunaticComponentProps>) => (
        <LunaticComponentContainer id={id} children={children} />
      )}
    />
  )
}

function computeFocusKey(
  base?: string,
  currentErrors?: Record<string, unknown>,
) {
  if (!base) {
    return undefined
  }
  if (currentErrors) {
    return [base, ...Object.keys(currentErrors)].join('-')
  }
  return currentErrors
}
