import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STReq, STRes, STColumnTag } from '@delon/abc';
import { SFSchema } from '@delon/form';

const TAG: STColumnTag = {
  'ADMIN': { text: 'Admin', color: 'green' },
  2: { text: '一般', color: 'red' },
  3: { text: '进行中', color: 'blue' },
  4: { text: '默认', color: 'cyan' },
  5: { text: '警告', color: 'orange' },
};

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {
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

  res:STRes={
     reName:{total:'result.totalCount',list:'result.items'}
  };

  columns: STColumn[] = [
    { title: '编号', type:'no', index: 'no' },
    { title: '姓名', index: 'userName' },
    { title: '邮箱', index: 'emailAddress' },
    { title: '是否启用', type: 'yn',  index: 'isActive' },
    { title: '上次登录时间', type: 'date', index: 'lastLoginTime' },
    { title: '角色', type: 'tag', index: 'roleNames', tag: TAG },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
