import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const FormComponent = ({ addPost }) => {
     const { user, getAccessTokenSilently } = useAuth0();

     const [error, setError] = useState('');
     const [alertMessage, setAlertMessage] = useState('');
     const [alertError, setAlertError] = useState(false);
     const [imageSrc, setImageSrc] = useState('');
     const [accessToken, setAccessToken] = useState();
     const [post, setPost] = useState({
          title: '',
          message: '',
          selectedImage: null,
     });

     useEffect(() => {
          const getUserMetaData = async () => {
               const domain = process.env.REACT_APP_AUTH_DOMAIN;

               try {
                    const accessToken = await getAccessTokenSilently({
                         audience: `https://${domain}/api/v2/`,
                         scope: 'read:user_idp_tokens',
                    });

                    setAccessToken(accessToken);
               } catch (error) {
                    console.error(error.message);
               }
          };
          getUserMetaData();
     }, [getAccessTokenSilently, user?.sub]);

     const handleChange = (e) => {
          if (e.target.name !== 'selectedImage') {
               setPost((data) => ({
                    ...data,
                    [e.target.name]: e.target.value,
               }));
          } else {
               let reader = new FileReader();
               reader.readAsDataURL(e.target.files[0]);

               reader.onload = (x) => {
                    setImageSrc(x.target.result);
               };
               setPost((data) => ({
                    ...data,
                    [e.target.name]: e.target.files[0],
               }));
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!post.title || !post.message) {
               setError('Kan inte vara tomt');
               return;
          } else setError('');

          const formData = new FormData();
          formData.append('appUserId', user.sub);
          formData.append('author', user.name);
          formData.append('postTitle', post.title);
          formData.append('postMessage', post.message);
          if (post.selectedImage == null) {
               formData.append('file', post.selectedImage);
               formData.delete('file');
          } else formData.append('file', post.selectedImage);

          const config = {
               headers: {
                    Authorization: `Bearer ${accessToken}`,
               },
          };

          const res = await axios.post(
               'https://localhost:7017/api/BlogPosts',
               formData,
               config
          );

          if (res.status === 201) {
               setAlertError(false);
               setAlertMessage('Inlägg skickat');
               clearField(false);

               e.target.reset();
          } else {
               setAlertError(true);
               setAlertMessage('Något gick fel, försök igen');
               setTimeout(() => {
                    clearField(true);
               }, 2000);
          }

          addPost(JSON.stringify(formData));
     };

     const clearField = (error) => {
          if (!error) {
               post.title = '';
               post.message = '';
               post.selectedImage = null;
               setImageSrc('');
               setTimeout(() => {
                    setAlertMessage('');
               }, 2000);
          } else {
               setAlertMessage('');
          }
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
                    {imageSrc && (
                         <div className='preview-container'>
                              <img src={imageSrc} alt='' />
                         </div>
                    )}
                    <input
                         onChange={handleChange}
                         className='form-file-input'
                         type='file'
                         name='selectedImage'
                         accept='image/png, .jpg'
                    />
                    <button className='send-btn'>Lägg upp inlägg</button>
               </form>

               {!alertError && (
                    <div className='alert-message-success'>
                         <h3>{alertMessage}</h3>
                    </div>
               )}
               {alertError && (
                    <div className='alert-message-error'>
                         <h3>{alertMessage}</h3>
                    </div>
               )}
          </div>
     );
};

export default FormComponent;
