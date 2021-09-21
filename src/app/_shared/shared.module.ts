import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultImagePipe } from '../_core/pipes/default-image.pipe';
import { VimeoPipe } from '../_core/pipes/vimeo.pipe';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SplitArrayPipe } from '../_core/pipes/split-array.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { SafeUrlPipe } from '../_core/pipes/safe-url.pipe';
import { ImagePreloadDirective } from '../_core/directives/image-preload.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Components
import { ErrorComponent } from './components/error/error.component';
import { NewsComponent } from './components/news/news.component';
import { TrendingBuzzComponent } from './components/trending-buzz/trending-buzz.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { FiveColumnComponent } from './components/five-column/five-column.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { TwoSideBannerComponent } from './components/two-side-banner/two-side-banner.component';
import { ModalComponent } from './components/modal/modal.component';
import { LatestStoryComponent } from './components/latest-story/latest-story.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { EditorialSectionsComponent } from './components/editorial-sections/editorial-sections.component';
import { SpecialFeatureComponent } from './components/special-feature/special-feature.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TrendingComponent } from './components/trending/trending.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PodcastComponent } from './components/podcast/podcast.component';
import { TrendingTopComponent } from './trending-top/trending-top.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    NewsComponent,
    ErrorMessageComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SafeUrlPipe,
    SplitArrayPipe,
    ImagePreloadDirective,
    VimeoPipe,
    VideoPlayerComponent,
    FiveColumnComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    ModalComponent,
    LatestStoryComponent,
    MostPopularComponent,
    EditorialSectionsComponent,
    SpecialFeatureComponent,
    TrendingComponent,
    PodcastComponent,
    TrendingTopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxYoutubePlayerModule,
    SlickCarouselModule,
    FontAwesomeModule,
    ShareButtonModule,
    CarouselModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultImagePipe,
    ImagePreloadDirective,
    SafeUrlPipe,
    SplitArrayPipe,
    NgxYoutubePlayerModule,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    TrendingBuzzComponent,
    VideoPlayerComponent,
    VideoPlayerComponent,
    TrendingComponent,
    MostPopularComponent,
    FiveColumnComponent,
    EditorialSectionsComponent,
    FeaturedComponent,
    ErrorMessageComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    SpecialFeatureComponent,
    LatestStoryComponent,
    ModalComponent,
    SlickCarouselModule,
    FontAwesomeModule,
    ShareButtonModule,
    CarouselModule,
    TrendingTopComponent,
  ],
})
export class SharedModule {}
