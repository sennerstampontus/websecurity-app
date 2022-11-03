import { useState } from 'react';
import FormComponent from '../components/FormComponent';

const FormView = ({ sendUpMessages }) => {
     const [messages, setMessages] = useState(Object);
     const addMessages = (message) => {
          setMessages((state) => [...state, message]);
          sendUpMessages(message);
     };

     return (
          <>
               <div className='form-container'>
                    <FormComponent addPost={addMessages} />
               </div>
          </>
     );
};

export default FormView;
