import {
	OidcConfiguration,
	OidcProvider,
	TokenRenewMode,
} from '@axa-fr/react-oidc';
import { useEffect, useState } from 'react';
import { Authenticating } from '../Oidc/Authenticating';
import { AuthenticatingError } from '../Oidc/AuthenticatingError';
import { CallbackSuccess } from '../Oidc/CallbackSuccess';
import { ServiceWorkerNotSupported } from '../Oidc/ServiceWorkerNotSupported';
import { SessionLost } from '../Oidc/SessionLost';
import { Layout as LayoutSkeleton } from '../skeleton/Layout';
import { useGetOidcConfigurationQuery } from '../../lib/api/oidcAPI';

function Pending() {
	return <LayoutSkeleton />;
}

type AuthProviderProps = {
	children: JSX.Element;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [configuration, setConfiguration] = useState<
		OidcConfiguration | undefined
	>();

	const { data: oidcConfiguration, isError } = useGetOidcConfigurationQuery();

	useEffect(() => {
		if (oidcConfiguration) {
			setConfiguration({
				...oidcConfiguration,
				redirect_uri: `${window.location.origin}/login`,
				token_renew_mode: TokenRenewMode.access_token_invalid,
				refresh_time_before_tokens_expiration_in_second: 40,
				service_worker_relative_url: '/OidcServiceWorker.js',
				service_worker_only: false,
			});
		}
	}, [oidcConfiguration]);

	const oidcProviderReady = configuration;
	const waitingForOidcConfiguration = !configuration;

	if (isError) {
		return <>Error could only occurs in development !</>;
	}
	if (oidcProviderReady) {
		return (
			<OidcProvider
				configuration={configuration}
				loadingComponent={LayoutSkeleton}
				authenticatingComponent={Authenticating}
				callbackSuccessComponent={CallbackSuccess}
				sessionLostComponent={SessionLost}
				authenticatingErrorComponent={AuthenticatingError}
				serviceWorkerNotSupportedComponent={ServiceWorkerNotSupported}
			>
				{children}
			</OidcProvider>
		);
	}
	if (waitingForOidcConfiguration) {
		return <Pending />;
	}

	return <></>;
}
