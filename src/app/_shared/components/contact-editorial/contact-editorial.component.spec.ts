import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditorialComponent } from './contact-editorial.component';

describe('ContactEditorialComponent', () => {
  let component: ContactEditorialComponent;
  let fixture: ComponentFixture<ContactEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
