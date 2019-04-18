import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SocketRoutingModule } from './socket-routing.module';
import { SocketSocketTestTestComponent } from './socket/test/test/test.component';

const COMPONENTS = [SocketSocketTestTestComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, SocketRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SocketModule {}
