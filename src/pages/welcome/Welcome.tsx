import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { WelcomeContainer } from '../../components/Welcome';
import { useStromaePage } from '../../hooks/useStromaePage';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { useGetSurveyAPI } from '../../lib/api/useGetSurveyUnitAPI';
import { useOidcUser } from '@axa-fr/react-oidc';

/**
 * TODO filtrer sur DEFAULT_SURVEY
 */

export function Welcome() {
	const navigate = useNavigate();
	const { survey } = useStromaePage();
	const { oidcUser } = useOidcUser();
	const { metadata } = useGetSurveyAPI({ survey });
	useDocumentTitle("Page d'accueil", metadata);

	useEffect(() => {
		if (!oidcUser || !oidcUser.preferred_username) {
			return;
		}

		navigate(
			`/questionnaire/${survey}/unite-enquetee/${oidcUser.preferred_username.toUpperCase()}`
		);
	}, [oidcUser, navigate, survey]);

	return (
		<Layout>
			<WelcomeContainer />
		</Layout>
	);
}
