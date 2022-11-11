using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace blog_post_api.Models.Entities
{
    public class BlogPostsEntity
    {
        public BlogPostsEntity()
        {

        }
        public BlogPostsEntity(string author, string postTitle, string postMessage, string? imageUrl, string createdDate, string appUserId, UserEntity user)
        {

            Author = author;
            PostTitle = postTitle;
            PostMessage = postMessage;
            ImageUrl = imageUrl;
            CreatedDate = createdDate;
            AppUserId = appUserId;
            User = user;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Author { get; set; } = null!;

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string PostTitle { get; set; } = null!;

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string PostMessage { get; set; } = null!;

        public string? ImageUrl { get; set; }


        [Required]
        public string CreatedDate { get; set; } = null!;

        [Required]
        public string AppUserId { get; set; }
        public UserEntity User { get; set; } = null!;

    }
}