using Microsoft.AspNetCore.Authorization;

namespace blog_post_api.Filter
{
    public class HasScopeRequirement : IAuthorizationRequirement
    {
        public string Issure { get; }
        public string Scope { get; }


        public HasScopeRequirement(string scope, string issuer)
        {
            Scope = scope ?? throw new ArgumentNullException(nameof(scope));
            Issure = issuer ?? throw new ArgumentNullException(nameof(issuer));
        }
    }
}
