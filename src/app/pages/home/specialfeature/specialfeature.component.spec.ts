import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialfeatureComponent } from './specialfeature.component';

describe('SpecialfeatureComponent', () => {
  let component: SpecialfeatureComponent;
  let fixture: ComponentFixture<SpecialfeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialfeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
