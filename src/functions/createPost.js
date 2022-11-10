export async function createPost(message) {
     const newMessage = {
          appUserId: message.id,
          author: message.author,
          postTitle: message.title,
          postMessage: message.message,
          fileName: message.image,
     };
     try {
          const res = await fetch('https://localhost:7017/api/BlogPosts', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(newMessage),
          });

          const result = res.status;

          return result;
     } catch (error) {}
}
