import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = process.env.REACT_APP_AUTH_DOMAIN;
const client = process.env.REACT_APP_AUTH_CLIENT;
root.render(
     <React.StrictMode>
          <Router>
               <Auth0Provider
                    domain={domain}
                    clientId={client}
                    redirectUri={window.location.origin}
               >
                    <App />
               </Auth0Provider>
          </Router>
     </React.StrictMode>
);
