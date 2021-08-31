import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPapularComponent } from './most-papular.component';

describe('MostPapularComponent', () => {
  let component: MostPapularComponent;
  let fixture: ComponentFixture<MostPapularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPapularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPapularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
