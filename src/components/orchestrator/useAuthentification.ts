import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { uri404, uriDeconnexion, uriSurvey } from '../../lib/domainUri';

import { useOidc } from '@axa-fr/react-oidc';

function isOnPostCollectPage() {
	return window.location.pathname.endsWith('/post-envoi');
}

function getLogOutRedirectionUri(args: { survey?: string; unit?: string }) {
	const { survey, unit } = args;
	if (survey && isOnPostCollectPage()) {
		return uriSurvey(survey);
	}
	if (survey && unit) {
		return uriDeconnexion(survey, unit);
	}
	return uri404();
}

export function useAuthentification() {
	/**
	 * react-oidc ne méoïze pas login et logout : risque de boucle infinie.
	 */
	const { login, logout, isAuthenticated } = useOidc();
	const alreadyInit = useRef(false);
	const loginOrLogout = useRef(() => {});
	const { survey, unit } = useParams();

	useEffect(() => {
		if (!alreadyInit.current) {
			alreadyInit.current = true;
			loginOrLogout.current = () => {
				if (isAuthenticated) {
					logout(getLogOutRedirectionUri({ survey, unit }));
				} else {
					login('/');
				}
			};
		}
	}, [isAuthenticated, login, logout, survey, unit]);

	return { loginOrLogout: loginOrLogout.current, isAuthenticated };
}
