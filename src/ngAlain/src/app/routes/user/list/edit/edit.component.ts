import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';
import { format } from 'path';

@Component({
  selector: 'user-list-edit',
  templateUrl: './edit.component.html',
})
export class UserListEditComponent implements OnInit {
  record: any = {};

  i: any;
  schema: SFSchema = {
    properties: {
      id:{type :'integer', title:'id', ui:{hidden:true}},
      userName: {
        type: 'string',
        title: '账户名',
        ui: {
          validator: (
            value: any,
            formProperty: FormProperty,
            form: PropertyGroup,
          ) => {
            let reg = /[\u4e00-\u9fa5]+/;
            if (reg.test(value)) {
              return [{ keyword: 'required', message: '不能包含中文字符' }];
            }
          },
        },
      },
      emailAddress: { type: 'string', title: '邮箱地址', format: 'email' },
      name: { type: 'string', title: '姓' },
      surname: { type: 'string', title: '名' },
      password: {
        type: 'string',
        title: '密码',
        ui: {
          visibleIf: {
            id: (value: any) => value == 0
          },
        },
      },
      isActive: { type: 'boolean', title: '是否启用', default: true },
      roleNames: {
        title: '角色',
        type: 'string',
        enum: [
          { label: '管理员', value: 'ADMIN' },
          { label: '一般', value: 'Normal' },
          { label: '队长', value: 'Master' },
        ],
        ui: {
          widget: 'select',
          mode: 'tags',
        },
        default: null,
      },
    },
    required: [
      'userName',
      'emailAddress',
      'name',
      'surname',
      'isActive',
      'roleNames',
    ],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    // $no: {
    //   widget: 'text',
    // },
    // $href: {
    //   widget: 'string',
    // },
    // $description: {
    //   widget: 'textarea',
    //   grid: { span: 24 },
    // },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id != null)
      this.http
        .get(`services/app/User/Get?Id=${this.record.id}`)
        .subscribe((res: any) => {
          if (res.success !== true) {
            return;
          }
          this.i = res.result;
        });
  }

  save(value: any) {
    if (this.i.id == 0) {
      this.http.post(`services/app/User/Create`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.put(`services/app/User/Update`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
