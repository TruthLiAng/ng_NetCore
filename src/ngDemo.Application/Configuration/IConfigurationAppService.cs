using System.Threading.Tasks;
using ngDemo.Configuration.Dto;

namespace ngDemo.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
