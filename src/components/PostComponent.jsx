import React from 'react';
import DOMPurify from 'dompurify';

const PostComponent = ({ message }) => {
     return (
          <>
               <div className='post-card-container'>
                    {message.imageUrl && (
                         <div className='image-container'>
                              <img src={message.imageUrl} alt='test.jpg' />
                         </div>
                    )}
                    {!message.imageUrl && <div></div>}

                    <div className='post-card-column'>
                         <div className='post-card-title'>
                              <p>{message.postTitle}</p>
                              <p className='post-author'>
                                   <i>{message.author}</i>
                              </p>
                         </div>

                         <p
                              className='post-message'
                              dangerouslySetInnerHTML={{
                                   __html: DOMPurify.sanitize(
                                        `"${message.postMessage}"`
                                   ),
                              }}
                         >
                              {/* {message.postMessage} */}
                         </p>
                         <p className='post-created'>{message.createdDate}</p>
                    </div>
               </div>
          </>
     );
};

export default PostComponent;
