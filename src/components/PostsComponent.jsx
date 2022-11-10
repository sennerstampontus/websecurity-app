import React from 'react';
import PostComponent from './PostComponent';

const PostsComponent = ({ messages }) => {
     // const mockMessages = [
     //      {
     //           id: 1,
     //           title: 'Northen lights Norway',
     //           message: 'When I was on trip to Norway, I saw the incredible northen lights',
     //           image: 'https://apod.nasa.gov/apod/image/2202/AuroraPillars_Correia_960.jpg',
     //           author: 'Chris Pratt',
     //      },
     //      {
     //           id: 2,
     //           title: 'Space walk.. in space',
     //           message: 'I WENT TO SPACE!',
     //           image: 'https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=1380',
     //           author: 'Howard Wolowitz',
     //      },
     //      {
     //           id: 3,
     //           title: 'New lens is amazing!',
     //           message: 'My new camera lens for my Nikon 66E super duper camera',
     //           image: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
     //           author: 'George Lucas',
     //      },
     // ];

     return (
          <>
               <h1 style={{ textAlign: 'center', margin: '3rem 0' }}>
                    Blogginlägg
               </h1>

               {messages &&
                    messages.map((message) => (
                         <PostComponent key={message.id} message={message} />
                    ))}
          </>
     );
};

export default PostsComponent;
