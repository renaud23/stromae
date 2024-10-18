import { ErrorPage } from './html/ErrorPage';
import { useStromaePage } from '../../hooks/useStromaePage';

export function RouteError({ code }: { code?: number }) {
	const { errorType } = useStromaePage();
	return <ErrorPage code={code} errorType={errorType} />;
}
