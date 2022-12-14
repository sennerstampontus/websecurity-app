namespace blog_post_api.Models.OutputModels
{
    public class OutputPostModel
    {
        public OutputPostModel(string postTitle, string postMessage, string? imageUrl, string createdDate, string userId)
        {
            PostTitle = postTitle;
            PostMessage = postMessage;
            ImageUrl = imageUrl;
            CreatedDate = createdDate;
            UserId = userId;
        }

        public string Id { get; set; }
        public string PostTitle { get; set; }
        public string PostMessage { get; set; }
        public string? ImageUrl { get; set; }
        public string CreatedDate { get; set; } 
        public string UserId { get; set; }

    }
}
