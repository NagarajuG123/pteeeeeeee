import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  UrlSegment,
} from '@angular/router';
import { ErrorComponent } from './_shared/components/error/error.component';
import { PowerRankingComponent } from './pages/power-ranking/power-ranking.component';
import { TrendingbuzzComponent } from './pages/trendingbuzz/trendingbuzz.component';
import { StoryComponent } from './pages/story/story.component';

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
    path: 'trendingbrandbuzz',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/trendingbuzz/trendingbuzz.module').then(
        (m) => m.TrendingbuzzModule
      ),
  },
  {
    path: 'author/:authorSlug',
    loadChildren: () =>
      import('./pages/author/author.module').then((m) => m.AuthorModule),
  },
  {
    path: 'powerrankings',
    loadChildren: () =>
      import('./pages/power-ranking/power-ranking.module').then(
        (m) => m.PowerRankingModule
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
      import('./pages/termsofuse/termsofuse.module').then(
        (m) => m.TermsofuseModule
      ),
  },
  {
    path: 'contact-editorial',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/contacteditorial/contacteditorial.module').then(
        (m) => m.ContacteditorialModule
      ),
  },
  {
    path: 'searchpopup',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'brandsearch',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/brand-search/brand-search.module').then(
        (m) => m.BrandSearchModule
      ),
  },
  {
    path: 'subscribe',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/subscribe/subscribe.module').then(
        (m) => m.SubscribeModule
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
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'storypage/preview/:storyId',
    pathMatch: 'full',
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
    path: ':slug',
    loadChildren: () =>
      import('./pages/brand/brand.module').then((m) => m.BrandModule),
  },
  {
    path: '**', // Navigate to Home Page if not found any page
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
