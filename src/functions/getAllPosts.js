export async function getAllPosts() {
     try {
          const res = await fetch('https://localhost:7017/api/BlogPosts', {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
               },
          });

          const result = await res.json();

          return result;
     } catch (error) {}
}
