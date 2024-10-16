import { useEffect } from 'react';
import { MetadataSurvey } from '../typeStromae/type';

function concat({ title, header }: { title?: string; header?: string }) {
	return `${title ?? ''}${title && header ? ' | ' : ''}${header ?? ''}`;
}

export function useDocumentTitle(
	title?: string | null,
	metadata?: MetadataSurvey
) {
	const header = metadata?.Header?.serviceTitle as string;

	useEffect(() => {
		if (title) {
			document.title = concat({ title, header });
		}
	}, [title, metadata, header]);
}
