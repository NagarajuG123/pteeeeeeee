import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTrendingComponent } from './category-trending.component';

describe('CategoryTrendingComponent', () => {
  let component: CategoryTrendingComponent;
  let fixture: ComponentFixture<CategoryTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTrendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
