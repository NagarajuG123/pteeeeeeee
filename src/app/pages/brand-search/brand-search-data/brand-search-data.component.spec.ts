import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSearchDataComponent } from './brand-search-data.component';

describe('BrandSearchDataComponent', () => {
  let component: BrandSearchDataComponent;
  let fixture: ComponentFixture<BrandSearchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandSearchDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSearchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
