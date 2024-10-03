// Add bellow trusted domains, access tokens will automatically injected to be send to
// trusted domain can also be a path like https://www.myapi.com/users,
// then all subroute like https://www.myapi.com/useers/1 will be authorized to send access_token to.

// Domains used by OIDC server must be also declared here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const trustedDomains = {
	default: [
		'https://api-questionnaire-recensement.developpement3.insee.fr',
		'https://auth.insee.test/auth/realms/recensement-questionnaire-menage',
		'http://localhost:3000',
	],

	// default: {
	// 	oidcDomains: ['https://auth.insee.test'],
	// 	accessTokenDomains: [
	// 		'https://api-questionnaire-recensement.developpement3.insee.fr',
	// 	],
	// },
};

// trustedDomains.config_show_access_token = {
// 	domains: [
// 		'https://api-questionnaire-recensement.developpement3.insee.fr',
// 		'https://auth.insee.test',
// 		'http://localhost:3000',
// 	],
// 	showAccessToken: true,
// };

// trustedDomains.config_separate_oidc_access_token_domains = {
// 	oidcDomains: [
// 		'https://api-questionnaire-recensement.developpement3.insee.fr',
// 		'https://auth.insee.test',
// 		'http://localhost:3000',
// 	],
// 	accessTokenDomains: [
// 		'https://api-questionnaire-recensement.developpement3.insee.fr',
// 		'https://auth.insee.test',
// 		'http://localhost:3000',
// 	],
// };
