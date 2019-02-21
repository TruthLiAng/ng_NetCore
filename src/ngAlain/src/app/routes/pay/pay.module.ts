import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PayRoutingModule } from './pay-routing.module';
import { PayAlipayComponent } from './alipay/alipay.component';
import { PayWechatpayComponent } from './wechatpay/wechatpay.component';

const COMPONENTS = [PayAlipayComponent, PayWechatpayComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, PayRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class PayModule {}
