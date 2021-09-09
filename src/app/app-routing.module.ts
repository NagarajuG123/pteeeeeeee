import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { PowerRankingComponent } from './pages/power-ranking/power-ranking.component';
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
    path: 'powerrankings',
    component: PowerRankingComponent,
    loadChildren: () =>
      import('./pages/power-ranking/power-ranking.module').then(
        (m) => m.PowerRankingModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule),
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
