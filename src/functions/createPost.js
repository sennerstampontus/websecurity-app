export async function createPost(message) {
     console.log('I got here');
     const newMessage = {
          appUserId: message.id,
          author: message.author,
          postTitle: message.title,
          postMessage: message.message,
          file: message.image,
     };

     console.log(message);
     try {
          const res = await fetch('https://localhost:7017/api/BlogPosts', {
               method: 'POST',
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
               body: message,
          });

          const result = res.status;

          return result;
     } catch (error) {
          console.error(error.message);
     }
}
