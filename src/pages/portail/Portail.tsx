import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Layout } from '../../components/layout';

import { WelcomeContainer } from '../../components/Welcome';
import { useAuthUser } from '../../lib/oidc';

/**
 * TODO filtrer sur DEFAULT_SURVEY
 */

export function Portail() {
	const navigate = useNavigate();
	const { survey } = useParams();
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
