import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultImagePipe } from '../_core/pipes/default-image.pipe';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { SafeUrlPipe } from '../_core/pipes/safe-url.pipe';
import { ImagePreloadDirective } from '../_core/directives/image-preload.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { TrendingBuzzComponent } from './components/trending-buzz/trending-buzz.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ArticleComponent } from './components/article/article.component';
import { HomeArticleComponent } from './components/home-article/home-article.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { VideoComponent } from './components/video/video.component';

// Pipes
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    ErrorMessageComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SafeUrlPipe,
    ImagePreloadDirective,
    MostPopularComponent,
    ArticleComponent,
    HomeArticleComponent,
    CarouselComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShareButtonModule,
    CarouselModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    DefaultImagePipe,
    ImagePreloadDirective,
    SafeUrlPipe,
    HeaderComponent,
    FooterComponent,
    TrendingBuzzComponent,
    MostPopularComponent,
    ErrorMessageComponent,
    ShareButtonModule,
    ArticleComponent,
    HomeArticleComponent,
    CarouselComponent,
    VideoComponent
  ],
})
export class SharedModule {}
