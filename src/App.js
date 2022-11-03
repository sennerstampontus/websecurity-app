import { useState } from 'react';
import './css/style.min.css';
import FormComponent from './components/FormComponent';
import PostsComponent from './components/PostsComponent';

function App() {
     const [messages, setMessages] = useState([]);
     const addMessages = (message) => {
          setMessages((state) => [...state, message]);
          console.log(message);
     };

     return (
          <>
               <div className='form-container'>
                    <FormComponent addPost={addMessages} />
               </div>
               <div className='messages-container'>
                    <PostsComponent messages={messages} />
               </div>
          </>
     );
}

export default App;
