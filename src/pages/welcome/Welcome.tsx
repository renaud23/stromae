import { useParams } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { WelcomeContainer } from '../../components/Welcome';

export function Welcome() {
	const { survey, unit } = useParams();
	useDocumentTitle("Page d'accueil");

	return (
		<Layout>
			<WelcomeContainer />
		</Layout>
	);
}
