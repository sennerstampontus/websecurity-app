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

namespace blog_post_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly SqlContext _context;

        public BlogPostsController(SqlContext context)
        {
            _context = context;
        }

        // GET: api/BlogPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPostsEntity>>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
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
        public async Task<ActionResult<OutputPostModel>> CreatePost(CreatePostModel model)
        {
            var _user = await _context.Users.Where(x => x.AppUserId == model.AppUserId).FirstOrDefaultAsync();


            if(_user == null)
            {
                _context.Users.Add(new UserEntity(model.AppUserId));
                await _context.SaveChangesAsync();

                var newUser = await _context.Users.Where(x => x.AppUserId == model.AppUserId).FirstOrDefaultAsync();

                var post = new BlogPostsEntity(model.Author, model.PostTitle, model.PostMessage, model.FileName, null, DateTime.Now.ToString(), model.AppUserId, newUser);


                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBlogPostsEntity", new { id = post.Id }, new OutputPostModel(post.PostTitle, post.PostMessage, post.CreatedDate, post.AppUserId));
            }
            else
            {
                var post = new BlogPostsEntity(model.Author, model.PostTitle, model.PostMessage, model.FileName, null, DateTime.Now.ToString(), model.AppUserId, _user);



                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBlogPostsEntity", new { id = post.Id }, new OutputPostModel(post.PostTitle, post.PostMessage, post.CreatedDate, post.AppUserId));
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
