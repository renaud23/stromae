import { useParams } from 'react-router-dom';
import { ErrorPage } from './html/ErrorPage';

export function RouteError({ code }: { code?: number }) {
	const { survey, errorType } = useParams();
	return <ErrorPage code={code} errorType={errorType} />;
}
