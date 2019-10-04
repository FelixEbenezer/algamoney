export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-eben.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-api-eben.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]

};
