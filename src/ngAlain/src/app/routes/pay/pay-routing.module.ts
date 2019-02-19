import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayAlipayComponent } from './alipay/alipay.component';
import { PayWechatpayComponent } from './wechatpay/wechatpay.component';

const routes: Routes = [

  { path: 'alipay', component: PayAlipayComponent },
  { path: 'wechatpay', component: PayWechatpayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
