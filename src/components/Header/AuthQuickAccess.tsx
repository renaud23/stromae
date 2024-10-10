import { useCallback } from 'react';
import { useAppSelector } from '../../redux/store';
import { useAuth } from '../../lib/oidc';
import { uri404, uriDeconnexion, uriSurvey } from '../../lib/domainUri';
import Button from '@codegouvfr/react-dsfr/Button';

function isOnPostCollectPage() {
	return window.location.pathname.endsWith('/post-envoi');
}

function getAuthLabel(isAuthenticated: boolean): string {
	if (isAuthenticated) {
		return 'Me déconnecter';
	}
	return 'Me connecter';
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

export function AuthQuickAccess() {
	const { login, logout, isAuthenticated } = useAuth();
	const unit = useAppSelector((s) => s.stromae.unit);
	const survey = useAppSelector((s) => s.stromae.survey);

	const handleOidcAuth = useCallback(() => {
		if (isAuthenticated) {
			logout(getLogOutRedirectionUri({ survey, unit }));
		} else {
			login('/');
		}
	}, [isAuthenticated, login, logout, survey, unit]);

	if (survey && unit) {
		return (
			<li>
				<Button iconId="fr-icon-lock-line" onClick={handleOidcAuth}>
					{getAuthLabel(isAuthenticated)}
				</Button>
			</li>
		);
	}
	return null;
}
