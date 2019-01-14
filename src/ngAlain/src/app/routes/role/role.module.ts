import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './list/list.component';

const COMPONENTS = [
  RoleListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    RoleRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoleModule { }
