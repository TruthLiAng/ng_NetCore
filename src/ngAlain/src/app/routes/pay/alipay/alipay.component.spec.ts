import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PayAlipayComponent } from './alipay.component';

describe('PayAlipayComponent', () => {
  let component: PayAlipayComponent;
  let fixture: ComponentFixture<PayAlipayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayAlipayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAlipayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
