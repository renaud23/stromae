import { type PropsWithChildren } from 'react'

import * as lunaticComponents from '@inseefr/lunatic'
import * as lunatic from '@inseefr/lunatic'
// import {  LunaticComponents } from '@inseefr/lunatic'
import type { FilledLunaticComponentProps } from '@inseefr/lunatic/lib/src/use-lunatic/commons/fill-components/fill-components'

import {
  CollectStatusEnum,
  type SavingFailure,
  type VariablesType,
} from '../../typeStromae/type'
import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer'

export type OrchestratedElement = {
  // useLunatic interface
  readonly getComponents?: ({
    only,
    except,
  }: {
    only?: string[]
    except?: string[]
  }) => FilledLunaticComponentProps[]
  readonly goPreviousPage?: () => void
  readonly goNextPage?: (arg?: { block: boolean }) => void
  readonly goToPage?: (page: { page: string; iteration?: number }) => void
  readonly getErrors?: () => Record<
    string,
    Record<string, Array<lunatic.LunaticError>>
  >
  readonly getModalErrors?: () => Record<string, Array<lunatic.LunaticError>>
  readonly getCurrentErrors?: () => Record<string, Array<lunatic.LunaticError>>
  readonly isFirstPage?: boolean
  readonly isLastPage?: boolean
  readonly onChange?: (...args: unknown[]) => void
  readonly getData?: (refreshCalculated: boolean) => VariablesType
  readonly compileControls?: () => {
    isCritical: boolean
    currentErrors?: Record<string, Array<lunatic.LunaticError>>
  }
  readonly pageTag?: string
  personalization?: Record<string, string | number | boolean | Array<string>>
  // controls errors
  currentErrors?: Record<string, Array<lunatic.LunaticError>>
  criticality?: boolean
  refreshControls?: boolean
  setRefreshControls?: (value: boolean) => void
  // handleChange
  currentChange?: { name: string }
  // saving
  savingFailure?: SavingFailure
  waiting?: boolean
  // disabled all components
  disabled?: boolean
  // Page given by API.getSuData at launch
  pageFromAPI?: string
  // last status of survey, give by the API ('INIT' | 'COLLECTED' | 'VALIDATED')
  initialCollectStatus?: CollectStatusEnum
  only?: string[]
  except?: string[]
  title?: string
}

type Props = {
  only?: string[]
  except?: string[]
  // Key that trigger a new autofocus on the first field
  focusKey?: string
} & Pick<
  OrchestratedElement,
  | 'currentErrors'
  | 'disabled'
  | 'getComponents'
  | 'goToPage'
  | 'goPreviousPage'
  | 'goNextPage'
>

export function ComponentsRenderer(props: Props) {
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
    <lunaticComponents.LunaticComponents
      autoFocusKey={computeFocusKey(focusKey, currentErrors)}
      components={validComponents}
      componentProps={() => ({
        ...rest,
        errors: currentErrors,
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
