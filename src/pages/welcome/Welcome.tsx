import { Layout } from '../../components/layout';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

import { WelcomeContainer } from '../../components/Welcome';

export function Welcome() {
	useDocumentTitle("Page d'accueil");

	return (
		<Layout>
			<WelcomeContainer />
		</Layout>
	);
}
