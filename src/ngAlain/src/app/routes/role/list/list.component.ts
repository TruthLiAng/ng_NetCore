import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STColumnTag, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { RoleListEditComponent } from './edit/edit.component';
import { RoleListViewComponent } from './view/view.component';

@Component({
  selector: 'role-list',
  templateUrl: './list.component.html',
})
export class RoleListComponent implements OnInit {
  url = `services/app/Role/GetAllRolesAsync`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') st: STComponent;

  res: STRes = {
    reName: { total: 'totalCount', list: 'items' },
  };

  columns: STColumn[] = [
    { title: '编号', type:'no', index: 'no' },
    { title: '角色标志', index: 'name' },
    { title: '角色名', index: 'displayName' },
    { title: '系统标志', index: 'normalizedName' },
    { title: '描述', index: 'description' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: { component: RoleListViewComponent, paramsName: 'record' },
        },
        {
          text: '编辑',
          type: 'static',
          modal: { component: RoleListEditComponent, paramsName: 'record' },
          click: 'reload',
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(RoleListEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
