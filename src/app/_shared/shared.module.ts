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
    ColumnsComponent,
    AdvertisementComponent,
    VideoPlayerComponent,
    FooterTopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SlickCarouselModule,
    NgxYoutubePlayerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
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
    ColumnsComponent,
    NewsComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SlickCarouselModule,
NgxYoutubePlayerModule,
    ColumnsComponent,
    VideoPlayerComponent
  ],
})
export class SharedModule {}
