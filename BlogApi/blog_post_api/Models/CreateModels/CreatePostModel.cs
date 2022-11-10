namespace blog_post_api.Models.CreateModels
{
    public class CreatePostModel
    {
        private string appUserId;

        public string AppUserId
        {
            get { return appUserId; }
            set { appUserId = value; }
        }

        public string Author { get; set; }
        public string PostTitle { get; set; }
        public string PostMessage { get; set; }
        public string FileName { get; set; }
    }
}
