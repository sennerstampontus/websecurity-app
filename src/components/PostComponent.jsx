import React from 'react';

const PostComponent = ({ message }) => {
     return (
          <>
               <div style={{ display: 'flex', marginTop: '1rem' }}>
                    <h1 style={{ marginRight: '1rem' }}>Rubrik:</h1>
                    <p>{message.title}</p>
               </div>
               <div style={{ display: 'flex' }}>
                    <h1 style={{ marginRight: '1rem' }}>Inlägg:</h1>
                    <p>{message.message}</p>
               </div>
          </>
     );
};

export default PostComponent;
