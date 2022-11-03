import React from 'react';
import PostComponent from './PostComponent';

const PostsComponent = ({ messages }) => {
     return (
          <>
               <h1>Messages:</h1>

               {messages &&
                    messages.map((message) => (
                         <PostComponent key={message.id} message={message} />
                    ))}
          </>
     );
};

export default PostsComponent;
