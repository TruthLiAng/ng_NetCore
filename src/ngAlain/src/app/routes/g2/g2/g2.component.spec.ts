import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { G2G2Component } from './g2.component';

describe('G2G2Component', () => {
  let component: G2G2Component;
  let fixture: ComponentFixture<G2G2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ G2G2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(G2G2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
