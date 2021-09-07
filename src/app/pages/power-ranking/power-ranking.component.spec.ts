import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerRankingComponent } from './power-ranking.component';

describe('PowerRankingComponent', () => {
  let component: PowerRankingComponent;
  let fixture: ComponentFixture<PowerRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
