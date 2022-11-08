import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/style.min.css';
import FormComponent from './components/FormComponent';
import PostsComponent from './components/PostsComponent';
import Navbar from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
     const [messages, setMessages] = useState([]);
     const addMessages = (message) => {
          setMessages((state) => [...state, message]);
          console.log(message);
     };
     const [Authorized, setAuthorized] = useState(true);
     const addAuth = (auth) => {
          setAuthorized((state) => [...state, auth]);
     };

     const { isAuthenticated } = useAuth0();

     return (
          <>
               <Navbar isAuthorized={isAuthenticated} />
               <Routes>
                    {isAuthenticated && (
                         <Route
                              path='/create-post'
                              element={<FormComponent addPost={addMessages} />}
                         />
                    )}

                    <Route
                         path='/'
                         element={<PostsComponent messages={messages} />}
                    />
               </Routes>

               {/* <div className='messages-container'>
                    
               </div> */}
          </>
     );
}

export default App;
