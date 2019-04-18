import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocketSocketTestTestComponent } from './socket/test/test/test.component';

const routes: Routes = [

  { path: 'test', component: SocketSocketTestTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketRoutingModule { }
