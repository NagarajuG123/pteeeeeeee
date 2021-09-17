import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoSideBannerComponent } from './two-side-banner.component';

describe('TwoSideBannerComponent', () => {
  let component: TwoSideBannerComponent;
  let fixture: ComponentFixture<TwoSideBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoSideBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoSideBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
