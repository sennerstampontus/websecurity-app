import React from 'react';
import PostComponent from './PostComponent';

const PostsComponent = ({ messages }) => {
     const mockMessages = [
          {
               id: 1,
               title: 'First Title',
               message: 'First message',
               image: 'https://apod.nasa.gov/apod/image/2202/AuroraPillars_Correia_960.jpg',
               author: 'Auhtor One',
          },
          {
               id: 2,
               title: 'Second Title',
               message: 'Second message',
               image: 'https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=1380',
               author: 'Auhtor Two',
          },
          {
               id: 3,
               title: 'Third Title',
               message: 'Third message',
               image: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
               author: 'Author Three',
          },
     ];

     return (
          <>
               <h1 style={{ textAlign: 'center', margin: '3rem 0' }}>
                    Blogginlägg
               </h1>

               {messages &&
                    mockMessages.map((message) => (
                         <PostComponent key={message.id} message={message} />
                    ))}
          </>
     );
};

export default PostsComponent;
