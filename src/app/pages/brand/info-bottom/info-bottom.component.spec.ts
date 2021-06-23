import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBottomComponent } from './info-bottom.component';

describe('InfoBottomComponent', () => {
  let component: InfoBottomComponent;
  let fixture: ComponentFixture<InfoBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
