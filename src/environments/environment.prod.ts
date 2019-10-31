export const environment = {
  production: true,
  apiUrl: 'https://ngangalixapi.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('ngangalixapi.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]


};
