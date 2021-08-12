import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultImagePipe } from '../_core/pipes/default-image.pipe';
import { VimeoPipe } from '../_core/pipes/vimeo.pipe';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SplitArrayPipe } from '../_core/pipes/split-array.pipe';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
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
import { FooterTopComponent } from './footer/footer-top/footer-top.component';
import { FiveColumnComponent } from './components/five-column/five-column.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { TwoSideBannerComponent } from './components/two-side-banner/two-side-banner.component';
import { ModalComponent } from './components/modal/modal.component';
import { LatestStoryComponent } from './components/latest-story/latest-story.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

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
    FooterTopComponent,
    VideoPlayerComponent,
    FiveColumnComponent,
    CarouselComponent,
    FeaturedComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    ModalComponent,
    LatestStoryComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxYoutubePlayerModule,
    MalihuScrollbarModule.forRoot(),
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
    FooterTopComponent,
    AdvertisementComponent,
    NewsComponent,
    TrendingBuzzComponent,
    VideoPlayerComponent,
    VideoPlayerComponent,
    CarouselComponent,
    FiveColumnComponent,
    FeaturedComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    LatestStoryComponent,
    ModalComponent,
    MalihuScrollbarModule,
    SlickCarouselModule,
    ShareButtonModule,
  ],
})
export class SharedModule {}
