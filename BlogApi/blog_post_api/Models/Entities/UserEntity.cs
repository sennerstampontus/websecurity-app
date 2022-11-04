using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace blog_post_api.Models.Entities
{

    public class UserEntity
    {
        public UserEntity()
        {

        }

        public UserEntity(string appUserId)
        {
            AppUserId = appUserId;
        }

        [Key]
        public int Id { get; set; }
        public string AppUserId { get; set; }
        
        public ICollection<BlogPostsEntity> BlogPosts { get; set; }
    }
}
