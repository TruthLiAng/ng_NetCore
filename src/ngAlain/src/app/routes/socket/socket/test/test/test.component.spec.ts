import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketSocketTestTestComponent } from './test.component';

describe('SocketSocketTestTestComponent', () => {
  let component: SocketSocketTestTestComponent;
  let fixture: ComponentFixture<SocketSocketTestTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketSocketTestTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketSocketTestTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
