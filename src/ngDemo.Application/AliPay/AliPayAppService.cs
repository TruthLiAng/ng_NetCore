using Abp;
using Alipay.AopSdk.Core;
using Alipay.AopSdk.Core.Domain;
using Alipay.AopSdk.Core.Request;
using Alipay.AopSdk.Core.Response;
using ngDemo.Alipay;
using System;

namespace ngDemo.AliPay
{
    public class AliPayAppService : AbpServiceBase, IAliPayAppService
    {
        private IAopClient client;

        private string APPID = "2016092600602633";
        private string APP_PRIVATE_KEY = "MIIEowIBAAKCAQEAwALrkG9prGPCRydZBX+GhaALwi7a+IPpKYI8eOPiIzeSWfCU2hXY3dHIOItIwKG0PNTcQ3ESWM67ckW0baBE7sFRiM4sYhDY5ohHq+uuBj3d9lB4eRZKQ/cSB2TUhFAvm388IJ32oYHcL4jfcguyX1NikGrOTUnkXVQxwd8SEEfUrjtOdj3qOsTWBxGzj6sdFmo8x3Txpa23ghYSnAF5moPlE/BOmV+d2aHLeKIR98wL80o2QYpHg5Y2ImhDZr3ydvX5hK/7QS5NpxjDeIoh3Uf1/Ys7R6QcDvqkmnhQBFL1U9rtbO6OH4wPegiRYqIrM0WJDR+QrB5U9aBnZJsliQIDAQABAoIBABYZf/Fc0WXVCYxU/AsE9X+1vwS3jd5imFh9s+YaHHH/OGn/pbJAJ3jIZ2oSpen98pe5zCw6/GiaSrrJSQ4BD04HlBHR4Qvccop+Dvm7o4j2X/C0rFkLdrrB2iJduZQNAp28FDiQ1c0a/DPAZi9jJ0GPgF2s3VfJ9G3FfgCZYyPaXXfMyvAYQ+M9RnW39GWIP0GE3uKgfBe+uBjq2mP4B9m/GOKnvGKvf55zcpDQjBiI9KMgGklI96/ksK7WuoB3hEbBd+tlV7Wki112rIjRZx51EHRLtxexDe4I+NCwEuQYMMyhVxkESYD3/8nt+RACej9oQ8dOJnTB5OtW7xggRU0CgYEA7dPgnYLL9drae7Ckj4AsPJ8JYc6mmTyzxMWzBW88SpClL9hfLTr6JEntLovB/KSngzm06o92NO22k6zlqTbXagSJtSdi8QaNuF7WGmLU2PVb8kxGRMYZRhOnx9jzPtZa2M+/fmyL80/C9WgH5gLnIB8a8X3TR1WPV6xaR7a68FcCgYEAzq7V/+V0mjdaZRitfB1030ChfrWg8d+Qkt8KQdqXGd5LW76eBpOmdQyZDd1T2faOWWlcXc5F3Jf3CGSg7pYON1L4aUKvHo8O6vGC+XgQlQkKORDefRfi0WWfiPkDb3SpLGfMKXLqV5H//TDcbFD7nrdcRaVtsLf8HQuCp9+VbR8CgYEAqYcqyZx+vxXuP9U+uHvpDJ1hFrMz1m+KxW0Xm3wbQhuxZFWcIqWzwUJhK5i8AtdsAQKVj84LuNbqGoJYgzJwg0YQ02zr/ltpkk8n108z4iOkEyeDv2pmgalpI+/mFJi/0WTlX70IVbw5gK1TVAYlsqP5lMLYZDT9JMXa5NvAjakCgYBC476KdN5J0sREl7n9wyLB5g7eDTYrUWlevyR4r5/bVWAaLxTBmCN1GkCmhgzPK8ZiFYE5MrrVa7EdXEPhM1sieI3Asz4tq6ruSn9S8ZKcSTKvyU/YOFTF5Be/oqeD+MOPhYBDoddJxAyPCrMrswHcGgeY2rMnUEQduk3suqWHjQKBgCaVURVG0/aKzSgwWsrtxFsG8K4e+LrN6t8PHXCvkUd3vDAT+VAAo99hqhrZkUmWRzbv/e+OWANY+zZI1rD0Q8F1qodkg0QYM1ZWZ82VrHBdrNoPIwUARyDlRpkloG+fOpXLUR4oNuQA8x8W6pDowwRzKYN1NS7hld2RPzhbmF2e";
        private string ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA665ZbAfWWNQVLEwgQZ/B19HnfRJLPtEsyXKwACvnz9mk+zf+vti2sCBJz0aXaOIMrxw18iDR9JkTSjVDLjJE6r0aJeSz1wfLoUHqsepYGDjJOOlh7+8Ro46VGmb22C8ReqJQPCWgmcXDGeP7r355HEIMZlMVD+Ti+FVFFggYV5rS72yfJaGebauFqJbGEKNnyTAqGMtZzna2+mctY2O0Rc4Du/PnVk449n4Wty//kBh4ubnaP8kQtXyHBs0vwYUClrqBE4Lje7atP8oQnCJsSHXBQgoK5H8ZUZRzfVeiXnB2c5xmgBXgzNhfx79beVUseNiWilEhXgl/eJahOrRrVwIDAQAB";
        private string CHARSET = "UTF-8";

        private static string GetCurrentPath()
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            return basePath + "//App_Data//";
        }

        public AliPayAppService()
        {
            try
            {
                //client = new DefaultAopClient("https://openapi.alipaydev.com/gateway.do", APPID, GetCurrentPath() + "rsa_private_key_pkcs8.pem", "json", "1.0", "RSA2", GetCurrentPath() + "rsa_public_key_pkcs8.pem", CHARSET, true);

                client = new DefaultAopClient("https://openapi.alipaydev.com/gateway.do", APPID, APP_PRIVATE_KEY, "json", "1.0", "RSA2", ALIPAY_PUBLIC_KEY, CHARSET, false);
                Logger.Info("初始化成功");
            }
            catch (Exception ex)
            {
                throw new Exception("初始化支付宝支付对象失败！", ex);
            }
        }

        public string close(string para)
        {
            throw new NotImplementedException();
        }

        public string downloadurlQuery(string para)
        {
            throw new NotImplementedException();
        }

        public string pay(AlipayTradePagePayModel para)
        {
            try
            {
                AlipayTradePagePayRequest request = new AlipayTradePagePayRequest();
                // 设置同步回调地址
                request.SetReturnUrl("");
                // 设置异步通知接收地址
                request.SetNotifyUrl("");
                // 将业务model载入到request

                para.QrPayMode = "2";
                request.SetBizModel(para);

                AlipayTradePagePayResponse response = client.PageExecute(request, null, "post");
                return response.Body;
            }
            catch (Exception e)
            {
                Logger.Error("失败", e);
                return "支付失败";
            }
        }

        public string query(AlipayTradeQueryModel para)
        {
            AlipayTradeQueryRequest request = new AlipayTradeQueryRequest();

            // 将业务model载入到request
            request.SetBizModel(para);

            AlipayTradeQueryResponse response = client.Execute(request);
            return response.Body;
        }

        public string refund(string para)
        {
            throw new NotImplementedException();
        }

        public string refundQuery(string para)
        {
            throw new NotImplementedException();
        }
    }
}