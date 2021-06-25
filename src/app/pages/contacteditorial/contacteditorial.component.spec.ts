import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacteditorialComponent } from './contacteditorial.component';

describe('ContacteditorialComponent', () => {
  let component: ContacteditorialComponent;
  let fixture: ComponentFixture<ContacteditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContacteditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContacteditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
