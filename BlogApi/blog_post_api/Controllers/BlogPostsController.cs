using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using blog_post_api.Data;
using blog_post_api.Models.Entities;
using blog_post_api.Models.OutputModels;
using blog_post_api.Models.CreateModels;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using blog_post_api.Filters;
using Azure.Storage.Blobs;

namespace blog_post_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly SqlContext _context;
        private BlobServiceClient serviceClient;
        private BlobContainerClient containerClient;
        private BlobClient blobClient;
        private string[] _tagsAllowed = new string[] { "<b>", "</b>", "<i>", "</i>" };

        public BlogPostsController(SqlContext context, IConfiguration configuration)
        {
            _context = context;


            serviceClient = new BlobServiceClient(configuration.GetConnectionString("BlobString"));

            try
            {
                containerClient = serviceClient.CreateBlobContainer("images");
                containerClient.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.BlobContainer);
            }
            catch
            {
                containerClient = serviceClient.GetBlobContainerClient("images");
            }
        }

      

        // GET: api/BlogPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPostsEntity>>> GetPosts()
        {

            List<BlogPostsEntity> Messages = await _context.Posts.ToListAsync();
            foreach (var message in Messages)
            {
                message.PostMessage = HttpUtility.HtmlDecode(message.PostMessage);
            }

            foreach (var tag in _tagsAllowed)
            {
                var encodedTag = HttpUtility.HtmlEncode(tag);
                foreach (var message in Messages)
                {
                    message.PostMessage = message.PostMessage.Replace(encodedTag, tag);
                }
            }

            return Messages;
        }

        // GET: api/BlogPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPostsEntity>> GetBlogPostsEntity(int id)
        {
            var blogPostsEntity = await _context.Posts.FindAsync(id);

            if (blogPostsEntity == null)
            {
                return NotFound();
            }

            return blogPostsEntity;
        }

        // PUT: api/BlogPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutBlogPostsEntity(int id, BlogPostsEntity blogPostsEntity)
        //{
        //    if (id != blogPostsEntity.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(blogPostsEntity).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!BlogPostsEntityExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/BlogPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        
        public async Task<ActionResult<OutputPostModel>> CreatePost([FromForm] CreatePostModel model)
        {

            var imageUrl = "";

            using var image = model.File.OpenReadStream();

            blobClient = containerClient.GetBlobClient($"img_{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}");
            var res = await blobClient.UploadAsync(image);
            if (res.GetRawResponse().Status == 201)
            {
                imageUrl = blobClient.Uri.AbsoluteUri.ToString();

            } else { imageUrl = ""; }



            var _user = await _context.Users.Where(x => x.AppUserId == model.AppUserId).FirstOrDefaultAsync();
            string encodedMessage = HttpUtility.HtmlEncode(model.PostMessage);
            foreach(var tag in _tagsAllowed)
            {
                var encodedTag = HttpUtility.HtmlEncode(tag);
                encodedMessage = encodedMessage.Replace(encodedTag, tag);
            }
            


            if(_user == null)
            {
                _context.Users.Add(new UserEntity(model.AppUserId));
                await _context.SaveChangesAsync();

                var newUser = await _context.Users.Where(x => x.AppUserId == model.AppUserId).FirstOrDefaultAsync();

                var post = new BlogPostsEntity(model.Author, model.PostTitle, encodedMessage, imageUrl, DateTime.Now.ToString(), model.AppUserId, newUser);


                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                return Created("Post created", post);
            }
            else
            {
                var post = new BlogPostsEntity(model.Author, model.PostTitle, encodedMessage, imageUrl, DateTime.Now.ToString(), model.AppUserId, _user);



                _context.Posts.Add(post);
                await _context.SaveChangesAsync();



                return Created("Post created", post);
            }

           
        }

        // DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPostsEntity(int id)
        {
            var blogPostsEntity = await _context.Posts.FindAsync(id);
            if (blogPostsEntity == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(blogPostsEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //private bool BlogPostsEntityExists(int id)
        //{
        //    return _context.Posts.Any(e => e.Id == id);
        //}
    }
}
