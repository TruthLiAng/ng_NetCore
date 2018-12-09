import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { MoneyAccountServiceProxy, MoneyAccountLogServiceProxy, AccountLogDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-log',
  templateUrl: './createlog.component.html',
  styleUrls: ['./createlog.component.css']
})
export class CreatelogComponent extends AppComponentBase {
  @ViewChild('createAccountLogModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active: boolean = false;
  saving: boolean = false;
  log: AccountLogDto = null;
  accountId :number = 0;

  constructor(
      injector: Injector,
      private _accountLogService: MoneyAccountLogServiceProxy,
      private _MoneyAccountService :MoneyAccountServiceProxy,
  ) {
      super(injector);
  }

  show(accountId:number): void {
      this.active = true;
      this.modal.show();
      this.accountId = accountId;
      this.log = new AccountLogDto();
  }

  onShown(): void {
      $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
      this.saving = true;
      this.log.accountId = this.accountId;
      this._accountLogService.create(this.log)
          .subscribe(() => {
              this._MoneyAccountService.updateMoneyAsync(this.accountId,this.log.money)
              .pipe(finalize(() => { this.saving = false; }))
              .subscribe(() => {
              this.notify.info(this.l('SavedSuccessfully'));
              this.close();
              this.modalSave.emit(null);
               });
          });
  }

  close(): void {
      this.active = false;
      this.modal.hide();
  }
}