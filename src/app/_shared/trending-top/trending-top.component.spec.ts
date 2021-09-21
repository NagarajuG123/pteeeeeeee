import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingTopComponent } from './trending-top.component';

describe('TrendingTopComponent', () => {
  let component: TrendingTopComponent;
  let fixture: ComponentFixture<TrendingTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
