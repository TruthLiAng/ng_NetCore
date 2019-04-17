import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { G2RoutingModule } from './g2-routing.module';
import { G2G2Component } from './g2/g2.component';

const COMPONENTS = [
  G2G2Component];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    G2RoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class G2Module { }
