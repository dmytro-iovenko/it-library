const CLIENT_ID = "<CLIENTID HERE>";
const ISSUER = "https://dev-<DEV ID>.okta.com/oauth2/default";
const REDIRECT_URI = "http://localhost:3000/login/callback";

const config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
},
  widget: {
    baseUrl: ISSUER.replace('/oauth2/default', ''),
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    useInteractionCodeFlow: false,
    useClassicEngine: true,
    authParams: {
      // If your app is configured to use the Implicit flow
      // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
      // you will need to uncomment the below line
      // pkce: false
    },
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
  },
};

export default config;