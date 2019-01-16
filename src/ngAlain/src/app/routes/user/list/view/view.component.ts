import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'user-list-view',
  templateUrl: './view.component.html',
})
export class UserListViewComponent implements OnInit {
  record: any = {};
  i: any;

  statuSchema: SFSchema = {
    properties: {
      isActive: {
        type: 'boolean',
        title: '',
        readOnly: true,
      },
    },
    required: [],
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    this.http
      .get(`services/app/User/Get?Id=${this.record.id}`)
      .subscribe((res: any) => {
        if (res.success !== true) {
          return;
        }
        this.i = res.result;
      });
  }

  close() {
    this.modal.destroy();
  }
}
