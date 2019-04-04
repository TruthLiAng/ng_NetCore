import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MenuService,
  SettingsService,
  TitleService,
  ALAIN_I18N_TOKEN,
  User,
} from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService, NzMessageService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { CacheService } from '@delon/cache';
import { environment } from '@env/environment';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  injector: Injector;
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private cacheService: CacheService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      zip(
        this.httpClient.get(
          `AppData/GetLangData?_allow_anonymous=true&type=${
            this.i18n.defaultLang
          }`,
        ),
        this.httpClient.get('AppData/GetAppData?_allow_anonymous=true'),
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([langData, appData], err) => {
            resolve(null);
            //console.debug(err);
            return [langData, appData];
            //return [err,err];
          }),
        )
        .subscribe(
          ([langStrData, appStrData]) => {
            const langData = JSON.parse(langStrData);
            const appData = JSON.parse(appStrData);

            // setting language data
            this.translate.setTranslation(this.i18n.defaultLang, langData);
            this.translate.setDefaultLang(this.i18n.defaultLang);

            // application data
            const res: any = appData;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(res.user);

            // 初始化菜单
            this.menuService.add(res.menu);
            // 设置页面标题的后缀
            this.titleService.suffix = res.app.name;
          },
          () => {},
          () => {
            resolve(null);
          },
        );
    }).then(() => {
      this.initApp();
    });
  }

  initApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get('services/app/Session/GetCurrentLoginInformations')
        .subscribe((res: any) => {
          const sessionData = res;

          let user = {
            name: sessionData.user.name,
            email: sessionData.user.emailAddress,
            avatar: environment.imgUrl + sessionData.user.avatarImg,
          };

          this.settingService.setUser(user);

          // ACL：设置登录用户角色权限
          this.aclService.setRole(sessionData.roleNames);

          resolve(sessionData.roleNames);
        });
    }).then((roleNames: string[]) => {
      zip(
        this.httpClient.get('services/app/Configuration/GetRoles'),
        this.httpClient.get('services/app/Configuration/GetAllPermissions'),
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([roleData, permissionData], err) => {
            //console.debug(err);
            return [roleData, permissionData];
            //return [err,err];
          }),
        )
        .subscribe(([roleData, permissionData]) => {
          this.cacheService.set('rolesData', roleData);
          this.cacheService.set('permissonsData', permissionData);
        });
    });
  }
}
