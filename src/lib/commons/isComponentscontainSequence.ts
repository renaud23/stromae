import type { FilledLunaticComponentProps } from '@inseefr/lunatic/lib/src/use-lunatic/commons/fill-components/fill-components'

export function isComponentsContainSequence(
  components: Array<FilledLunaticComponentProps>,
): boolean {
  return components.some((component) => {
    const { componentType } = component
    return componentType === 'Sequence'
  }, false)
}
