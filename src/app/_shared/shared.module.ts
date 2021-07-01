import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultImagePipe } from '../_core/pipes/default-image.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SplitArrayPipe } from '../_core/pipes/split-array.pipe';

// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// Components
import { ErrorComponent } from './components/error/error.component';
import { TrendingComponent } from './components/trending/trending.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { NewsComponent } from './components/news/news.component';
import { TrendingBuzzComponent } from './components/trending-buzz/trending-buzz.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { FooterTopComponent } from './footer/footer-top/footer-top.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermsofuseBannerComponent } from './components/termsofuse-banner/termsofuse-banner.component';
import { ContactEditorialComponent } from './components/contact-editorial/contact-editorial.component';
import { FiveColumnComponent } from './components/five-column/five-column.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FeaturedComponent } from './components/featured/featured.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ErrorComponent,
    TrendingComponent,
    ColumnsComponent,
    NewsComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SplitArrayPipe,
    AdvertisementComponent,
    FooterTopComponent,
    VideoPlayerComponent,
    TermsofuseBannerComponent,
    ContactEditorialComponent,
    FiveColumnComponent,
    CarouselComponent,
    FeaturedComponent
  ],
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SlickCarouselModule,
    NgxYoutubePlayerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CarouselModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    NgbModule,
    HeaderComponent,
    FooterComponent,
    FooterTopComponent,
    SidebarComponent,
    TrendingComponent,
    AdvertisementComponent,
    NewsComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SplitArrayPipe,
    SlickCarouselModule,
    NgxYoutubePlayerModule,
    ColumnsComponent,
    VideoPlayerComponent,
    ColumnsComponent,
    VideoPlayerComponent,
    CarouselModule,
    TermsofuseBannerComponent,
    ContactEditorialComponent,
    CarouselComponent,
    FiveColumnComponent,
    FeaturedComponent
  ],
})
export class SharedModule {}
