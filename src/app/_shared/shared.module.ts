import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultImagePipe } from '../_core/pipes/default-image.pipe';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SplitArrayPipe } from '../_core/pipes/split-array.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SafeUrlPipe } from '../_core/pipes/safe-url.pipe';
// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
import { ContactEditorialComponent } from './components/contact-editorial/contact-editorial.component';
import { TwoSideBannerComponent } from './components/two-side-banner/two-side-banner.component';
import { ModalComponent } from './components/modal/modal.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ErrorComponent,
    NewsComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SafeUrlPipe,
    SplitArrayPipe,
    AdvertisementComponent,
    FooterTopComponent,
    VideoPlayerComponent,
    FiveColumnComponent,
    CarouselComponent,
    FeaturedComponent,
    ContactEditorialComponent,
    TopBannerComponent,
    TwoSideBannerComponent,
    ModalComponent
  ],
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxYoutubePlayerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CarouselModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    NgbModule,
    CarouselModule,
    DefaultImagePipe,
    SafeUrlPipe,
    SplitArrayPipe,
    NgxYoutubePlayerModule,
    HeaderComponent,
    FooterComponent,
    FooterTopComponent,
    SidebarComponent,
    AdvertisementComponent,
    NewsComponent,
    TrendingBuzzComponent,
    VideoPlayerComponent,
    VideoPlayerComponent,
    CarouselModule,
    CarouselComponent,
    FiveColumnComponent,
    FeaturedComponent,
    ContactEditorialComponent,
    TopBannerComponent,
    TwoSideBannerComponent
  ],
})
export class SharedModule {}
