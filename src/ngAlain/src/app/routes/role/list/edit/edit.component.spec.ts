import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleListEditComponent } from './edit.component';

describe('RoleListEditComponent', () => {
  let component: RoleListEditComponent;
  let fixture: ComponentFixture<RoleListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
