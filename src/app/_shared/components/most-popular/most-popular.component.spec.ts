import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularComponent } from './most-popular.component';

<<<<<<< HEAD
describe('MostPapularComponent', () => {
=======
describe('MostPopularComponent', () => {
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
  let component: MostPopularComponent;
  let fixture: ComponentFixture<MostPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [MostPopularComponent],
    }).compileComponents();
=======
      declarations: [ MostPopularComponent ]
    })
    .compileComponents();
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
