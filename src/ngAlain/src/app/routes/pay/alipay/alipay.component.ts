import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'pay-alipay',
  templateUrl: './alipay.component.html',
})
export class PayAlipayComponent implements OnInit {
  schema: SFSchema = {
    properties: {
      remark: {
        type: 'string',
        title: '结果',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 9 },
        },
      },
    },
  };

  constructor(private http: _HttpClient, private msgSrv: NzMessageService) {}

  ngOnInit() {}

  paymodel: any = {
    body: '测试商品1',
    subject: '测试商品11',
    totalAmount: '666',
    outTradeNo: new Date().getMilliseconds().toString(),
    productCode: 'FAST_INSTANT_TRADE_PAY',
  };

  pay() {
    this.http.post(`services/app/AliPay/Pay`, this.paymodel).subscribe(res => {
      this.msgSrv.success('保存成功');
    });
  }
}
