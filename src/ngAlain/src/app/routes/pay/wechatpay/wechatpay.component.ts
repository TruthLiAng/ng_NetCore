import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'pay-wechatpay',
  templateUrl: './wechatpay.component.html',
})
export class PayWechatpayComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
