import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'role-list-edit',
  templateUrl: './edit.component.html',
})
export class RoleListEditComponent implements OnInit {
  record: any = {};
  i: any;
  isAddView: boolean = true;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称' },
      displayName: { type: 'string', title: '代号' },
      normalizedName: { type: 'string', title: '系统名' },
      description: { type: 'string', title: '描述' },
      isStatic: { type: 'boolean', title: 'isStatic', default: true },
      permissions: {
        type: 'string',
        title: '权限选择',
        enum: [
          { label: '用户管理', value: 'PagesUsers' },
          { label: '角色管理', value: 'PagesRoles' },
          { label: '租户管理', value: 'PagesTenants' },
        ],
        ui: {
          widget: 'select',
          mode: 'tags',
        },
      },
    },
    required: ['name', 'displayName', 'normalizedName', 'isStatic','permissions'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id != null)
      this.isAddView = false;
      this.http
        .get(`services/app/Role/Get?Id=${this.record.id}`)
        .subscribe((res: any) => {
          if (res.success !== true) {
            return;
          }
          this.i = res.result;
        });
  }

  save(value: any) {
    if (this.i.id == 0) {
      this.http.post(`services/app/Role/Create`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.put(`services/app/Role/Update`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
