import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MoneyAccountServiceProxy, AccountDto, PagedResultDtoOfAccountDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { CreateAccountComponent } from 'app/moneyAccount/create-account/create-account.component';
import { EditUserComponent } from 'app/users/edit-user/edit-user.component';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './accounts.component.html',
    animations: [appModuleAnimation()]
})
export class AccountsComponent extends PagedListingComponentBase<AccountDto> {
    @ViewChild('createAccountModal') createAccountModal: CreateAccountComponent;
    @ViewChild('editAccountModal') editAccountModal: EditUserComponent;

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

    editUser(account: AccountDto): void {
        this.editAccountModal.show(account.id);
    }
}