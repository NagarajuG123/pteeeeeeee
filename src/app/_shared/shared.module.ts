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
// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Components
import { ErrorComponent } from './components/error/error.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { NewsComponent } from './components/news/news.component';
import { TrendingBuzzComponent } from './components/trending-buzz/trending-buzz.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { FiveColumnComponent } from './components/five-column/five-column.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { TwoSideBannerComponent } from './components/two-side-banner/two-side-banner.component';
import { ModalComponent } from './components/modal/modal.component';
import { LatestStoryComponent } from './components/latest-story/latest-story.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { EditorialSectionsComponent } from './components/editorial-sections/editorial-sections.component';
import { SpecialFeatureComponent } from './components/special-feature/special-feature.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    NewsComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SafeUrlPipe,
    SplitArrayPipe,
    ImagePreloadDirective,
    VimeoPipe,
    AdvertisementComponent,
    VideoPlayerComponent,
    FiveColumnComponent,
    CarouselComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    ModalComponent,
    LatestStoryComponent,
    MostPopularComponent,
    EditorialSectionsComponent,
    SpecialFeatureComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxYoutubePlayerModule,
    SlickCarouselModule,
    ShareButtonModule,
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
    AdvertisementComponent,
    NewsComponent,
    TrendingBuzzComponent,
    VideoPlayerComponent,
    VideoPlayerComponent,
    CarouselComponent,
    MostPopularComponent,
    FiveColumnComponent,
    EditorialSectionsComponent,
    FeaturedComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    SpecialFeatureComponent,
    LatestStoryComponent,
    ModalComponent,
    SlickCarouselModule,
    ShareButtonModule,
  ],
})
export class SharedModule {}
