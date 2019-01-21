namespace ngDemo.Sessions.Dto
{
    public class GetCurrentLoginInformationsOutput
    {
        public ApplicationInfoDto Application { get; set; }

        public UserLoginInfoDto User { get; set; }

        public TenantLoginInfoDto Tenant { get; set; }

        /// <summary>
        /// 用户角色
        /// </summary>
        public string[] RoleNames { get; set; }
    }
}