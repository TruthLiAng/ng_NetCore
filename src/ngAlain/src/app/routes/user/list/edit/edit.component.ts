import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {
  SFSchema,
  SFUISchema,
  FormProperty,
  PropertyGroup,
  SFSchemaEnum,
} from '@delon/form';
import { format } from 'path';
import { CacheService } from '@delon/cache';

@Component({
  selector: 'user-list-edit',
  templateUrl: './edit.component.html',
})
export class UserListEditComponent implements OnInit {
  record: any = {};

  enums: SFSchemaEnum[] = [];
  i: any;
  isAddView: boolean = true;
  schema: SFSchema = {
    properties: {
      id: { type: 'integer', title: 'id', ui: { hidden: true } },
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
            id: (value: any) => value == 0,
          },
        },
      },
      isActive: { type: 'boolean', title: '是否启用', default: true },
      roleNames: {
        title: '角色',
        type: 'string',
        enum: this.enums,
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
    private cacheService: CacheService,
  ) {}

  ngOnInit(): void {
    this.getTagData();

    if (this.record.id != null)
    {
      this.isAddView = false;
      this.http
        .get(`services/app/User/Get?Id=${this.record.id}`)
        .subscribe((res: any) => {
          this.i = res;
        });
    }
  }

  getTagData() {
    let roleData = this.cacheService.getNone<any>('rolesData');

    roleData.items.forEach(ele => {
      let enumValue: SFSchemaEnum = {
        label: ele.displayName,
        value: ele.normalizedName,
      };

      this.enums.push(enumValue);
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
