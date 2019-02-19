using Abp.Application.Services;
using Aop.Api.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace ngDemo.Alipay
{
    public interface IAliPayAppService : IApplicationService
    {
        /// <summary>
        /// 统一收单下单并支付页面接口
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        string pay(AlipayTradePagePayModel para);

        /// <summary>
        /// 统一收单交易退款接口
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        string refund(string para);

        /// <summary>
        /// 统一收单交易退款查询接口
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        string refundQuery(string para);

        /// <summary>
        /// 统一收单线下交易查询接口
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        string query(AlipayTradeQueryModel para);

        /// <summary>
        /// 统一收单交易关闭接口
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        string close(string para);

        /// <summary>
        /// 查询对账单下载地址
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        string downloadurlQuery(string para);
    }
}