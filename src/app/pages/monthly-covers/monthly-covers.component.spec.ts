import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCoversComponent } from './monthly-covers.component';

describe('MonthlyCoversComponent', () => {
  let component: MonthlyCoversComponent;
  let fixture: ComponentFixture<MonthlyCoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCoversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyCoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
