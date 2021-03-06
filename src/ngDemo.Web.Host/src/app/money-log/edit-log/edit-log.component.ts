import { Component, OnInit, EventEmitter, Injector, ViewChild, ElementRef, Output } from '@angular/core';
import { AccountLogDto, MoneyAccountLogServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-log',
  templateUrl: './edit-log.component.html'
})
export class EditLogComponent extends AppComponentBase {
  @ViewChild('editAccountLogModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  active: boolean = false;
  log: AccountLogDto = null;

  constructor(
      injector: Injector,
      private _accountLogService: MoneyAccountLogServiceProxy,
  ) {
      super(injector);
  }

  show(id: number): void {
      this._accountLogService.get(id)
          .subscribe(
              (result) => {
                  this.log = result;
                  this.active = true;
                  this.modal.show();
              }
          );
  }

  onShown(): void {
      $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {

      this.saving = true;
      this._accountLogService.update(this.log)
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
