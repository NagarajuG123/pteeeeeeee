import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveColumnComponent } from './five-column.component';

describe('FiveColumnComponent', () => {
  let component: FiveColumnComponent;
  let fixture: ComponentFixture<FiveColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
