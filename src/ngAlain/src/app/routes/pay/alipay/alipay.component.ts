import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { DomSanitizer } from '@angular/platform-browser';
import { CacheService } from '@delon/cache';

@Component({
  selector: 'pay-alipay',
  templateUrl: './alipay.component.html',
})
export class PayAlipayComponent implements OnInit {
  _resData: any;

  paymodel: any = {
    body:
      '外星人Alienware 2018新款外星人游戏本17.3英寸笔记本游戏本电脑 【性价比】i7-8750 1070 16G FHD 1TB 机械+1TB ssd',
    subject:
      '外星人Alienware 2018新款外星人游戏本17.3英寸笔记本游戏本电脑 【性价比】i7-8750 1070 16G FHD 1TB 机械+1TB ssd',
    totalAmount: '99999.00',
    outTradeNo: new Date().getTime().toString(),
    productCode: 'FAST_INSTANT_TRADE_PAY',
  };

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

  constructor(
    private http: _HttpClient,
    //private msgSrv: NzMessageService,
    private sanitizer: DomSanitizer,
    private cacheService: CacheService,
  ) {}

  ngOnInit() {}

  pay() {
    this.http
      .post(`services/app/AliPay/Pay`, this.paymodel)
      .subscribe((res: string) => {
        const newWindow = window.open('about:blank', '_blank');
        newWindow.document.write(res);
        newWindow.document.title = 'Validation Warnings';
        newWindow.document.close();
      });
  }

  query() {}
}
