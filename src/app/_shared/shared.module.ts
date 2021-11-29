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
import { FiveColumnComponent } from './components/five-column/five-column.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { SpecialFeatureComponent } from './components/special-feature/special-feature.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleComponentComponent } from './components/article-component/article-component.component';

// Pipes

@NgModule({
  declarations: [
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    ErrorMessageComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SafeUrlPipe,
    ImagePreloadDirective,
    FiveColumnComponent,
    MostPopularComponent,
    SpecialFeatureComponent,
    CarouselComponent,
    ArticleComponentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    HeaderComponent,
    FooterComponent,
    TrendingBuzzComponent,
    MostPopularComponent,
    FiveColumnComponent,
    FeaturedComponent,
    ErrorMessageComponent,
    SpecialFeatureComponent,
    FontAwesomeModule,
    ShareButtonModule,
    CarouselModule,
    CarouselComponent,
    ArticleComponentComponent
  ],
})
export class SharedModule {}
