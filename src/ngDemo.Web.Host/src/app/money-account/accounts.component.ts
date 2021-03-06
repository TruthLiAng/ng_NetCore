import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MoneyAccountServiceProxy, AccountDto, PagedResultDtoOfAccountDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { CreateAccountComponent } from 'app/money-account/create-account/create-account.component';
import { EditAccountComponent } from 'app/money-account/edit-account/edit-account.component';
import { MoneyLogComponent } from 'app/money-log/money-log.component';
import { finalize } from 'rxjs/operators';
import { CreatelogComponent } from '@app/money-log/createlog/createlog.component';

@Component({
    templateUrl: './accounts.component.html',
    animations: [appModuleAnimation()]
})
export class AccountsComponent extends PagedListingComponentBase<AccountDto> {
    @ViewChild('createAccountModal') createAccountModal: CreateAccountComponent;
    @ViewChild('editAccountModal') editAccountModal: EditAccountComponent;
    @ViewChild('accountLogListModal') accountLogListModal: MoneyLogComponent;
    @ViewChild('createAccountLogModal') createAccountLogModal: CreatelogComponent;

    active: boolean = false;
    accounts: AccountDto[] = [];

    constructor(
        injector: Injector,
        private _accountService: MoneyAccountServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._accountService.getAll(request.skipCount, request.maxResultCount)
            .pipe(finalize(() => {
                finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfAccountDto) => {
                this.accounts = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(account: AccountDto): void {
        abp.message.confirm(
            "Delete user '" + account.name + "'?",
            (result: boolean) => {
                if (result) {
                    this._accountService.delete(account.id)
                        .subscribe(() => {
                            abp.notify.info("Deleted User: " + account.name);
                            this.refresh();
                        });
                }
            }
        );
    }

    // Show Modals
    createAccount(): void {
        this.createAccountModal.show();
    }

    editAccount(account: AccountDto): void {
        this.editAccountModal.show(account.id);
    }

    createLog(account: AccountDto):void {
        this.createAccountLogModal.show(account.id);
      }
}