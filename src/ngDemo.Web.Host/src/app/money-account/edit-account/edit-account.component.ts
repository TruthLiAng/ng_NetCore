import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { MoneyAccountServiceProxy, UserServiceProxy, AccountDto, UserDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'edit-account-modal',
    templateUrl: './edit-account.component.html'
})
export class EditAccountComponent extends AppComponentBase {
    @ViewChild('editAccountModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving: boolean = false;
    active: boolean = false;
    account: AccountDto = null;
    user: UserDto = null;

    constructor(
        injector: Injector,
        private _accountService: MoneyAccountServiceProxy,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    show(id: number): void {
        this._accountService.get(id)
            .toPromise()
            .then((value)=>{this._userService.get(value.creatorUserId)
            .subscribe(
                (result) => {
                    this.user = result;
                    this.active = true;
                    this.modal.show();
                }
            );
            this.account = value;
            });
            // .subscribe((result) => {
            //     this.account = result;
            // });

            // this._userService.get(this.account.creatorUserId)
            // .subscribe(
            //     (result) => {
            //         this.user = result;

            //         this.modal.show();
            //     }
            // );
           
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {

        this.saving = true;
        this._accountService.update(this.account)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
