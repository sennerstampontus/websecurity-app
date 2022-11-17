import React from 'react';
import PostComponent from './PostComponent';

const PostsComponent = ({ messages }) => {
     return (
          <>
               <h1 style={{ textAlign: 'center', margin: '3rem 0' }}>Posts</h1>

               <div className='post-grid'>
                    {messages &&
                         messages.map((message) => (
                              <PostComponent
                                   key={message.id}
                                   message={message}
                              />
                         ))}

                    {messages <= 0 && (
                         <h3>Seems like there is no posts to load..</h3>
                    )}
               </div>
          </>
     );
};

export default PostsComponent;
