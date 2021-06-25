import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialCalenderComponent } from './editorial-calender.component';

describe('EditorialCalenderComponent', () => {
  let component: EditorialCalenderComponent;
  let fixture: ComponentFixture<EditorialCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
