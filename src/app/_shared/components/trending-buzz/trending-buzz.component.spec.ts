import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingBuzzComponent } from './trending-buzz.component';

describe('TrendingBuzzComponent', () => {
  let component: TrendingBuzzComponent;
  let fixture: ComponentFixture<TrendingBuzzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingBuzzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingBuzzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
