import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { MoneyAccountServiceProxy, AccountDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-account-modal',
    templateUrl: './create-account.component.html'
})
export class CreateAccountComponent extends AppComponentBase {
    @ViewChild('createAccountModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    account: AccountDto = null;

    constructor(
        injector: Injector,
        private _accountService: MoneyAccountServiceProxy,
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.modal.show();
        this.account = new AccountDto();
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._accountService.create(this.account)
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