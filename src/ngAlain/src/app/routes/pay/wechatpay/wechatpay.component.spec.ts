import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PayWechatpayComponent } from './wechatpay.component';

describe('PayWechatpayComponent', () => {
  let component: PayWechatpayComponent;
  let fixture: ComponentFixture<PayWechatpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayWechatpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayWechatpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
