using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ngDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AppDataController : ngDemoControllerBase
    {
        private string path = AppDomain.CurrentDomain.BaseDirectory + "/App_Data/";

        /// <summary>
        /// 读取txt文件内容
        /// </summary>
        /// <param name="Path">文件地址</param>
        private string ReadJsonContent(string Path)
        {
            StreamReader sr = new StreamReader(Path, Encoding.Default);
            string res = "";
            string content;
            while ((content = sr.ReadLine()) != null)
            {
                res += content;
            }
            return res;
        }

        [HttpGet]
        public string GetLangData(string type)
        {
            string i18nPath = path + "i18n/" + type + ".json";
            return ReadJsonContent(i18nPath);
        }

        [HttpGet]
        public string GetAppData()
        {
            string appdataPath = path + "app-data.json";
            return ReadJsonContent(appdataPath);
        }
    }
}