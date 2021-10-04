import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingbuzzComponent } from './trendingbuzz.component';

describe('TrendingbuzzComponent', () => {
  let component: TrendingbuzzComponent;
  let fixture: ComponentFixture<TrendingbuzzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingbuzzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingbuzzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
