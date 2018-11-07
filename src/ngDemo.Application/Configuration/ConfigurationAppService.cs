using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ngDemo.Configuration.Dto;

namespace ngDemo.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ngDemoAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
