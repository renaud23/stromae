import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useMetadata } from '../hooks/useMetadata';

function concat({ title, header }: { title?: string; header?: string }) {
	return `${title ?? ''}${title && header ? ' | ' : ''}${header ?? ''}`;
}

export function useDocumentTitle(title?: string | null) {
	const { survey } = useParams();
	const metadata = useMetadata(survey);
	const header = metadata?.Header?.serviceTitle as string;

	useEffect(() => {
		if (title) {
			document.title = concat({ title, header });
		}
	}, [title, metadata, header]);
}
