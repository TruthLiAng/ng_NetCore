using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ngDemo.Configuration;
using ngDemo.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ngDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UploadController : ngDemoControllerBase
    {
        private readonly IConfigurationRoot _appConfiguration;
        private FilesHelper filesHelper;

        private String serverMapPath = "Upload/Files/";
        private String DeleteURL = "/FileUpload/DeleteFile/?file=";
        private String DeleteType = "GET";

        public UploadController(IHostingEnvironment env)
        {
            _appConfiguration = env.GetAppConfiguration();
            filesHelper = new FilesHelper(env, DeleteURL, DeleteType, _appConfiguration["App:ImgBaseUrl"], _appConfiguration["App:ImgBaseUrl"], serverMapPath);
        }

        [HttpPost]
        public JsonResult Upload()
        {
            var resultList = new List<ViewDataUploadFilesResult>();

            var CurrentContext = HttpContext;

            filesHelper.UploadAndShowResults(CurrentContext, resultList);
            JsonFiles files = new JsonFiles(resultList);

            bool isEmpty = !resultList.Any();
            if (isEmpty)
            {
                return Json("Error ");
            }
            else
            {
                return Json(files);
            }
        }
    }
}