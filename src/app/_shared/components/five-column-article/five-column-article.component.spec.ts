import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveColumnArticleComponent } from './five-column-article.component';

describe('FiveColumnArticleComponent', () => {
  let component: FiveColumnArticleComponent;
  let fixture: ComponentFixture<FiveColumnArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveColumnArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveColumnArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
