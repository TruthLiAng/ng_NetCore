import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UserServiceProxy} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './sidebar-footer.component.html',
    selector: 'sidebar-footer',
    encapsulation: ViewEncapsulation.None
})
export class SideBarFooterComponent extends AppComponentBase {

    versionText: string;
    currentYear: number;
    currentName: string;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);

        this.currentYear = new Date().getFullYear();
        this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
        this._userService.getNameAsync().subscribe(
            data=> this.currentName =data
        );
    }
}