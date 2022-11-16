using blog_post_api.Filter;
using Microsoft.AspNetCore.Authorization;

namespace blog_post_api.Handler
{
    public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == "scope" && c.Issuer == requirement.Issure))
                return Task.CompletedTask;

            var scopes = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issure).Value.Split(' ');


            if (scopes.Any(s => s == requirement.Scope))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
