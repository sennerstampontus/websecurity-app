namespace blog_post_api.Models.OutputModels
{
    public class OutputPostModel
    {
        public OutputPostModel(string postTitle, string postMessage, string createdDate, string userId)
        {
            PostTitle = postTitle;
            PostMessage = postMessage;
            CreatedDate = createdDate;
            UserId = userId;
        }

        public string Id { get; set; }
        public string PostTitle { get; set; }
        public string PostMessage { get; set; }
        public string CreatedDate { get; set; } 
        public string UserId { get; set; }

    }
}
