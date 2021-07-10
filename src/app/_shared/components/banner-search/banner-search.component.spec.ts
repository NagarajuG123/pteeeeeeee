import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSearchComponent } from './banner-search.component';

describe('BannerSearchComponent', () => {
  let component: BannerSearchComponent;
  let fixture: ComponentFixture<BannerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
