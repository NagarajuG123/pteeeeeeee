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
import { EditorialSectionsComponent } from './components/editorial-sections/editorial-sections.component';
import { SpecialFeatureComponent } from './components/special-feature/special-feature.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TrendingComponent } from './components/trending/trending.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    EditorialSectionsComponent,
    SpecialFeatureComponent,
    TrendingComponent,
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
    TrendingComponent,
    MostPopularComponent,
    FiveColumnComponent,
    EditorialSectionsComponent,
    FeaturedComponent,
    ErrorMessageComponent,
    SpecialFeatureComponent,
    FontAwesomeModule,
    ShareButtonModule,
    CarouselModule,
  ],
})
export class SharedModule {}
