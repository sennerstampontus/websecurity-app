import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = ({ isAuthorized }) => {
     //  const [Authorized, setAuthorized] = useState(false);
     //  setAuthorized(true);

     const { loginWithRedirect, logout } = useAuth0();

     return (
          <div className='navbar-container'>
               <div className='navbar-title'>
                    <h1>Memwiki</h1>
               </div>
               <div className='navbar-links'>
                    <NavLink to='/'>Blogg</NavLink>
                    {isAuthorized && [
                         <NavLink to='/create-post'>Skapa inlägg</NavLink>,
                         <NavLink to='/logout' onClick={() => logout()}>
                              Logga ut
                         </NavLink>,
                    ]}
                    {!isAuthorized && (
                         <button
                              className='navbar-login-btn'
                              onClick={() => loginWithRedirect()}
                         >
                              Logga in
                         </button>
                    )}
               </div>
          </div>
     );
};

export default Navbar;
