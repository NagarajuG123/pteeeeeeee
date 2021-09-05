import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialSectionsComponent } from './editorial-sections.component';

describe('EditorialSectionsComponent', () => {
  let component: EditorialSectionsComponent;
  let fixture: ComponentFixture<EditorialSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
