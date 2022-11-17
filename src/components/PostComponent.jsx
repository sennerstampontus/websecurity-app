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
                              <p>{DOMPurify.sanitize(message.postTitle)}</p>
                              <p className='post-author'>
                                   <i>{DOMPurify.sanitize(message.author)}</i>
                                   <p className='post-created'>
                                        {DOMPurify.sanitize(
                                             message.createdDate
                                        )}
                                   </p>
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
                    </div>
               </div>
          </>
     );
};

export default PostComponent;
