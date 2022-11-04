using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace blog_post_api.Models.Entities
{
    public class BlogPostsEntity
    {
        public BlogPostsEntity()
        {

        }
        public BlogPostsEntity(string id, string postTitle, string postMessage, string? fileName, IFormFile file, string createdDate, string appUserId, UserEntity user)
        {
            Id = id;
            PostTitle = postTitle;
            PostMessage = postMessage;
            FileName = fileName;
            File = file;
            CreatedDate = createdDate;
            AppUserId = appUserId;
            User = user;
        }

        [Key]
        public string Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string PostTitle { get; set; } = null!;

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string PostMessage { get; set; } = null!;

        public string? FileName { get; set; }
        [NotMapped]
        [Display(Name = "Upload File")]
        public IFormFile File { get; set; }

        [Required]
        public string CreatedDate { get; set; } = null!;

        [Required]
        public string AppUserId { get; set; }
        public UserEntity User { get; set; } = null!;

    }
}