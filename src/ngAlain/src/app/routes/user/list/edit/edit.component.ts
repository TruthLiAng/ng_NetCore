import { Component, OnInit, ViewChild, Input, Sanitizer } from '@angular/core';
import {
  NzModalRef,
  NzMessageService,
  UploadFile,
  UploadChangeParam,
} from 'ng-zorro-antd';
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
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Component({
  selector: 'user-list-edit',
  templateUrl: './edit.component.html',
  styles: [
    `
      .avatar {
        width: 128px;
        height: 128px;
      }
      .upload-icon {
        font-size: 32px;
        color: #999;
      }
      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    `,
  ],
})
export class UserListEditComponent implements OnInit {
  loading = false;
  avatarUrl: any;

  //uploadUrl: string = 'Upload/Upload';

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    //info: { file: UploadFile }
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // this.getBase64(info.file!.originFileObj!, (img: string) => {
        //   this.loading = false;
        //   this.avatarUrl = img;
        // });
        this.loading = false;
        this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(
          environment.imgUrl + info.file.response.files[0].url,
        );

        this.fileList[0].name = info.file.response.files[0].url;
        this.fileList[0].url = this.avatarUrl;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  record: any = {};

  enums: SFSchemaEnum[] = [];
  i: any;
  fileList: any = [
    {
      uid: -1,
      name: '',
      status: 'done',
      url: '',
    },
  ];
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
    private msg: NzMessageService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.getTagData();

    if (this.record.id != null) {
      this.isAddView = false;
      this.http
        .get(`services/app/User/Get?Id=${this.record.id}`)
        .subscribe((res: any) => {
          this.i = res;

          this.fileList[0].url = this.sanitizer.bypassSecurityTrustUrl(
            environment.imgUrl + res.avatarImg,
          );
          this.fileList[0].name = res.avatarImg;

          this.avatarUrl = this.fileList[0].url;
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
    value.avatarImg = this.fileList[0].name;
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
