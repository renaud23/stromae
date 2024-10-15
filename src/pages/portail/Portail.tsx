import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { WelcomeContainer } from '../../components/Welcome';
import { useAuthUser } from '../../lib/oidc';
import { useStromaePage } from '../../hooks/useStromaePage';

/**
 * TODO filtrer sur DEFAULT_SURVEY
 */

export function Portail() {
	const navigate = useNavigate();
	const { survey } = useStromaePage();
	const { oidcUser } = useAuthUser();

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
