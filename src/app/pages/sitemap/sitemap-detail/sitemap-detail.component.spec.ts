import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapDetailComponent } from './sitemap-detail.component';

describe('SitemapDetailComponent', () => {
  let component: SitemapDetailComponent;
  let fixture: ComponentFixture<SitemapDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitemapDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
