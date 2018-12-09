import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase,  PagedRequestDto } from '@shared/paged-listing-component-base';
import { AccountLogDto, MoneyAccountLogServiceProxy, PagedResultDtoOfAccountLogDto } from '@shared/service-proxies/service-proxies';
import { EditLogComponent } from 'app/money-log/edit-log/edit-log.component';
import { finalize } from 'rxjs/operators';
import { CreatelogComponent } from './createlog/createlog.component';

@Component({
  selector: 'app-money-log',
  templateUrl: './money-log.component.html',
  animations: [appModuleAnimation()]
})
export class MoneyLogComponent extends PagedListingComponentBase<AccountLogDto>  {
  

  @ViewChild('editAccountLogModal') editAccountLogModal: EditLogComponent;

   logs:AccountLogDto[]=[];
   active:boolean =false;

  constructor( injector: Injector,
    private _accountlogService: MoneyAccountLogServiceProxy
) {
    super(injector);
}

protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
  this._accountlogService.getAllByAccountId(2,request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
          finishedCallback()
      }))
      .subscribe((result: PagedResultDtoOfAccountLogDto) => {
          this.logs = result.items;
          this.showPaging(result, pageNumber);
      });
}
protected delete(log: AccountLogDto): void {
  abp.message.confirm(
    "Delete user '" + log.money + "'?",
    (result: boolean) => {
        if (result) {
            this._accountlogService.delete(log.id)
                .subscribe(() => {
                    abp.notify.info("Deleted User: " + log.money);
                    this.refresh();
                });
        }
    }
);
}



editAccountLog(log:AccountLogDto):void{
  this.editAccountLogModal.show(log.id);
}
}
