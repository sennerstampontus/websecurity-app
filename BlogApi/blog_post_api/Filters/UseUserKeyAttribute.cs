using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace blog_post_api.Filters
{
    public class UseUserKeyAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var userKey = configuration.GetValue<string>("ApiUserKey");


            if (!context.HttpContext.Request.Headers.TryGetValue("valid", out var valid))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (!userKey.Equals(valid))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            await next();
        }
    }
}
