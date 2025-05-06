import { useMemo } from 'react'

import type { LunaticSource } from '@inseefr/lunatic'

import { objectHasKey } from '../../../lib/commons/object'
import { useDocumentTitle } from '../../../utils/useDocumentTitle'

function getTitleByPage(
  source?: LunaticSource,
  defaultTitle = '',
): Record<string, string> {
  const base = {} as Record<string, string>
  if (!source) {
    return base
  }
  let title = defaultTitle
  return source.components.reduce((acc, component) => {
    if (component.componentType === 'Sequence' && 'title' in component) {
      title = (component.title as string) ?? defaultTitle
    }
    return { ...acc, [component.page]: title }
  }, base)
}

/**
 * Set the page title according to the current sequence in the form
 */
export function useQuestionnaireTitle({
  source,
  page,
  defaultTitle,
}: {
  source?: LunaticSource
  page: string
  defaultTitle: string
}): void {
  const titleMap = useMemo(
    () => getTitleByPage(source, defaultTitle),
    [source, defaultTitle],
  )
  useDocumentTitle(objectHasKey(titleMap, page) ? titleMap[page] : undefined)
}
