import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateExpensesComponent } from './calculate-expenses.component';

describe('CalculateExpensesComponent', () => {
  let component: CalculateExpensesComponent;
  let fixture: ComponentFixture<CalculateExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
