import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapDetailsComponent } from './sitemap-details.component';

describe('SitemapDetailsComponent', () => {
  let component: SitemapDetailsComponent;
  let fixture: ComponentFixture<SitemapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitemapDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
