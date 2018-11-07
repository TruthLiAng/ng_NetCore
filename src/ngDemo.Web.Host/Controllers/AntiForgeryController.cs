using Microsoft.AspNetCore.Antiforgery;
using ngDemo.Controllers;

namespace ngDemo.Web.Host.Controllers
{
    public class AntiForgeryController : ngDemoControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
