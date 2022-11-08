import React from 'react';

const PostComponent = ({ message }) => {
     return (
          <>
               <div className='post-card-container'>
                    <div className='image-container'>
                         <img src={message.image} alt='test.jpg' />
                         <p>
                              In skickat av: <span>{message.author}</span>
                         </p>
                    </div>
                    <div className='post-card-column'>
                         <p className='post-card-title'>{message.title}</p>
                         <p>{message.message}</p>
                    </div>
               </div>
          </>
     );
};

export default PostComponent;
