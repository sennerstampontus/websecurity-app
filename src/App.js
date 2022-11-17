import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/style.min.css';
import FormComponent from './components/FormComponent';
import PostsComponent from './components/PostsComponent';
import Navbar from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllPosts } from './functions/getAllPosts';

function App() {
     const [messages, setMessages] = useState([]);
     const addMessages = async (message) => {
          setMessages((state) => [...state, message]);
     };
     useEffect(() => {
          async function fetchData() {
               const postsArray = await getAllPosts();
               const sortedList = postsArray.sort(
                    (a, b) => parseInt(b.id) - parseInt(a.id)
               );
               setMessages(sortedList);

               return postsArray;
          }

          fetchData();
     }, [messages]);

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
          </>
     );
}

export default App;
