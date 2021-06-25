import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribepageComponent } from './subscribepage.component';

describe('SubscribepageComponent', () => {
  let component: SubscribepageComponent;
  let fixture: ComponentFixture<SubscribepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
