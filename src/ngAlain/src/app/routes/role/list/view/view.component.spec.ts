import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleListViewComponent } from './view.component';

describe('RoleListViewComponent', () => {
  let component: RoleListViewComponent;
  let fixture: ComponentFixture<RoleListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
