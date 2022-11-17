import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = ({ isAuthorized }) => {
     const { loginWithRedirect, logout } = useAuth0();

     return (
          <div className='navbar-container'>
               <div className='navbar-title'>
                    <h1>Memwiki</h1>
               </div>
               <div className='navbar-links'>
                    <NavLink to='/'>Blog posts</NavLink>
                    {isAuthorized && [
                         <NavLink to='/create-post'>Create post</NavLink>,
                         <NavLink to='/logout' onClick={() => logout()}>
                              Logout
                         </NavLink>,
                    ]}
                    {!isAuthorized && (
                         <button
                              className='navbar-login-btn'
                              onClick={() => loginWithRedirect()}
                         >
                              Login
                         </button>
                    )}
               </div>
          </div>
     );
};

export default Navbar;
