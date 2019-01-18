import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {
  STColumn,
  STComponent,
  STReq,
  STRes,
  STColumnTag,
  STColumnTagValue,
  STData,
} from '@delon/abc';
import { SFSchema, SFSchemaEnum } from '@delon/form';
import { UserListEditComponent } from './edit/edit.component';
import { UserListViewComponent } from './view/view.component';
import { CacheService } from '@delon/cache';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {
  TAG: STColumnTag = {};

  url = `services/app/User/GetAllUsersAsync`;

  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st') st: STComponent;

  res: STRes = {
    reName: { total: 'result.totalCount', list: 'result.items' },
    process: (data: STData[]) => {
      let roleData = this.cacheService.getNone<any>('rolesData');

      for (let index = 0; index < data.length; index++) {
        const row = data[index].roleNames;
        for (let r = 0; r < row.length; r++) {
          const role_Names = row[r];
          for (let ro = 0; ro < roleData.items.length; ro++) {
            const roles = roleData.items[ro];
            if (role_Names === roles.normalizedName) {
              data[index].roleNames[r] = roles.displayName;
            }
          }
        }
      }
      return data;
    },
  };

  columns: STColumn[] = [
    { title: '编号', type: 'no', index: 'no' },
    { title: '姓名', index: 'userName' },
    { title: '邮箱', index: 'emailAddress' },
    { title: '是否启用', type: 'yn', index: 'isActive' },
    { title: '上次登录时间', type: 'date', index: 'lastLoginTime' },
    { title: '角色', render: 'custom' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: { component: UserListViewComponent, paramsName: 'record' },
        },
        {
          text: '编辑',
          type: 'static',
          modal: { component: UserListEditComponent, paramsName: 'record' },
          click: 'reload',
        },
      ],
    },
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private cacheService: CacheService,
  ) {}

  ngOnInit() {
  }

  add() {
    this.modal
      .createStatic(UserListEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }
}
