import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { ContacteditorialComponent } from './pages/contacteditorial/contacteditorial.component';
import { PowerRankingComponent } from './pages/power-ranking/power-ranking.component';
import { StoryComponent } from './pages/story/story.component';
import { ErrorComponent } from './_shared/components/error/error.component';

export function isArticlePage(url: UrlSegment[]) {
  if (url.length === 1 && url[0].path.match(/-[0-9-]+$/)) {
    return {
      consumed: url,
      posParams: {
        brandSlug: new UrlSegment('1851', {}),
        storySlug: new UrlSegment(url[0].path, {}),
      },
    };
  }
  if (
    url.length === 2 &&
    url[0].path.match(/^[a-z0-9-]+$/) &&
    url[1].path.match(/-[0-9-]+$/)
  ) {
    return {
      consumed: url,
      posParams: {
        brandSlug: new UrlSegment(url[0].path, {}),
        storySlug: new UrlSegment(url[1].path, {}),
      },
    };
  }
  return null;
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'powerrankings',
    component: PowerRankingComponent,
    loadChildren: () =>
      import('./pages/power-ranking/power-ranking.module').then(
        (m) => m.PowerRankingModule
      ),
  },
  {
    path: 'contact-editorial',
    component: ContacteditorialComponent,
    loadChildren: () =>
      import('./pages/contacteditorial/contacteditorial.module').then(
        (m) => m.ContacteditorialModule
      ),
  },
  {
    path: 'sitemap',
    loadChildren: () =>
      import('./pages/sitemap/sitemap.module').then((m) => m.SitemapModule),
  },
  {
    path: 'termsofuse',
    loadChildren: () =>
      import('./pages/terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'brandsearch',
    loadChildren: () =>
      import('./pages/brand-search/brand-search.module').then(
        (m) => m.BrandSearchModule
      ),
  },
  {
    path: 'monthlydetails/:month/:year/:date/:id',
    loadChildren: () =>
      import('./pages/monthly-details/monthly-details.module').then(
        (m) => m.MonthlyDetailsModule
      ),
  },
  {
    path: 'monthlycovers',
    loadChildren: () =>
      import('./pages/monthly-covers/monthly-covers.module').then(
        (m) => m.MonthlyCoversModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'storypage/preview/:storyId',
    component: StoryComponent,
    loadChildren: () =>
      import('./pages/story/story.module').then((m) => m.StoryModule),
  },
  {
    path: '404',
    pathMatch: 'full',
    component: ErrorComponent,
  },
  {
    matcher: isArticlePage,
    component: StoryComponent,
    loadChildren: () =>
      import('./pages/story/story.module').then((m) => m.StoryModule),
  },

  {
    path: '**', // Navigate to Home Page if not found any page
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
