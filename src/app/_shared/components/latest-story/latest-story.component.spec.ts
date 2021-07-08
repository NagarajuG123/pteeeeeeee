import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestStoryComponent } from './latest-story.component';

describe('LatestStoryComponent', () => {
  let component: LatestStoryComponent;
  let fixture: ComponentFixture<LatestStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
