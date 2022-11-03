import { useState } from 'react';

const FormComponent = ({ addPost }) => {
     const [error, setError] = useState('');
     const [post, setPost] = useState({
          title: '',
          message: '',
     });

     const handleChange = (e) => {
          setPost((data) => ({
               ...data,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (!post.title || !post.message) {
               setError('Kan inte vara tomt');
               return;
          } else setError('');

          const message = {
               id: Date.now().toString(),
               title: post.title,
               message: post.message,
          };

          addPost(message);
     };

     return (
          <div className='form-container-box'>
               <h1>Nytt inlägg</h1>
               <form onSubmit={handleSubmit}>
                    <div className='form-style'>
                         <input
                              name='title'
                              className='input-header'
                              placeholder='Ange rubrik'
                              onChange={handleChange}
                         />
                         <p className='text-error'>{error}</p>
                    </div>
                    <div className='textfield-container'>
                         <textarea
                              name='message'
                              className='textfield-input'
                              placeholder='Låt oss höra vad du vill säga..'
                              onChange={handleChange}
                         />
                         <p className='text-error'>{error}</p>
                    </div>
                    <button className='send-btn'>Lägg upp inlägg</button>
               </form>
          </div>
     );
};

export default FormComponent;
