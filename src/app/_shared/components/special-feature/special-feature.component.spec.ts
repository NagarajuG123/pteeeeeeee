import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialFeatureComponent } from './special-feature.component';

describe('SpecialFeatureComponent', () => {
  let component: SpecialFeatureComponent;
  let fixture: ComponentFixture<SpecialFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
