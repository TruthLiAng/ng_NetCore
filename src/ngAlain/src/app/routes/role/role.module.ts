import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './list/list.component';
import { RoleListEditComponent } from './list/edit/edit.component';
import { RoleListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  RoleListComponent];
const COMPONENTS_NOROUNT = [
  RoleListEditComponent,
  RoleListViewComponent];

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
