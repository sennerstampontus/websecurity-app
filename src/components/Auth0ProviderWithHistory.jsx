import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
     const navigate = useNavigate();

     const domain = process.env.REACT_APP_AUTH_DOMAIN;
     const client = process.env.REACT_APP_AUTH_CLIENT;
     const audience = process.env.REACT_APP_AUTH_AUDIENCE;

     const onRedirectCallback = (appState) => {
          navigate(appState?.returnTo || window.location.pathname);
     };
     return (
          <Auth0Provider
               domain={domain}
               clientId={client}
               audience={audience}
               redirectUri={window.location.origin}
               onRedirectCallback={onRedirectCallback}
          >
               {children}
          </Auth0Provider>
     );
};

export default Auth0ProviderWithHistory;
