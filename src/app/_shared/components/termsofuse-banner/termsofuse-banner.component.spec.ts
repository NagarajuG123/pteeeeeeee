import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofuseBannerComponent } from './termsofuse-banner.component';

describe('TermsofuseBannerComponent', () => {
  let component: TermsofuseBannerComponent;
  let fixture: ComponentFixture<TermsofuseBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsofuseBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofuseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
