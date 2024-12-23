import { useMemo } from 'react';
import { LunaticSource } from '../typeLunatic/type-source';
import { MetadataSurvey } from '../typeStromae/type';
import { useAppSelector } from '../redux/store';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import { objectHasKey } from '../lib/commons/object';

function getTitleByPage(
	source?: LunaticSource,
	defaultTitle = ''
): Record<string, string> {
	const base = {} as Record<string, string>;
	if (!source) {
		return base;
	}
	let title = defaultTitle;
	return source.components.reduce((acc, component) => {
		if (component.componentType === 'Sequence') {
			title = component.title ?? defaultTitle;
		}
		return { ...acc, [component.page]: title };
	}, base);
}

/**
 * Set the page title according to the current sequence in the form
 */
export function useQuestionnaireTitle(
	defaultTitle: string,
	metadata?: MetadataSurvey,
	source?: LunaticSource
): void {
	const page = useAppSelector((s) => s.stromae.pageTag);
	const titleMap = useMemo(
		() => getTitleByPage(source, defaultTitle),
		[source, defaultTitle]
	);

	useDocumentTitle(
		objectHasKey(titleMap, page) ? titleMap[page] : undefined,
		metadata
	);
}
