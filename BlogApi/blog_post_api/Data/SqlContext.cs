using blog_post_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace blog_post_api.Data
{
    public class SqlContext : DbContext
    {
        public SqlContext()
        {

        }

        public SqlContext(DbContextOptions<SqlContext> options) : base(options)
        {

        }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<BlogPostsEntity> Posts { get; set; }
    }
}
