import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSearchComponent } from './brand-search.component';

describe('BrandSearchComponent', () => {
  let component: BrandSearchComponent;
  let fixture: ComponentFixture<BrandSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
