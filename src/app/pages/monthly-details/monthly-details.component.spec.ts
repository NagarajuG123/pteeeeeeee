import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDetailsComponent } from './monthly-details.component';

describe('MonthlyDetailsComponent', () => {
  let component: MonthlyDetailsComponent;
  let fixture: ComponentFixture<MonthlyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
