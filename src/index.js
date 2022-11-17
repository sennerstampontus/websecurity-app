import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
     <React.StrictMode>
          <Router>
               <Auth0ProviderWithHistory>
                    <App />
               </Auth0ProviderWithHistory>
          </Router>
     </React.StrictMode>
);
