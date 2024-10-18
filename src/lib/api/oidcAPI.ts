import { OidcConfiguration } from '@axa-fr/react-oidc';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const oidcAPI = createApi({
	reducerPath: 'oidcAPI',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	endpoints: (builder) => ({
		getOidcConfiguration: builder.query<OidcConfiguration, void>({
			query: () => `/configuration.json`,
		}),
	}),
});

export const { useGetOidcConfigurationQuery } = oidcAPI;
