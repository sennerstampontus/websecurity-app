namespace blog_post_api.Models.CreateModels
{
    public class CreateUserModel
    {
        public CreateUserModel()
        {

        }

        public CreateUserModel(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
    }
}
