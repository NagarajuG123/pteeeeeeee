import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseResearchComponent } from './franchise-research.component';

describe('FranchiseResearchComponent', () => {
  let component: FranchiseResearchComponent;
  let fixture: ComponentFixture<FranchiseResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
