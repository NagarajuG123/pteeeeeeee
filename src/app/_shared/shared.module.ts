import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultImagePipe } from '../_core/pipes/default-image.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// Components
import { ErrorComponent } from './components/error/error.component';
import { MenuComponent } from './components/menu/menu.component';
import { TrendingComponent } from './components/trending/trending.component';
import { ScrollBannerComponent } from './components/scroll-banner/scroll-banner.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { FranchiseComponent } from './components/franchise/franchise.component';
import { TrendingBuzzComponent } from './components/trending-buzz/trending-buzz.component';
import { VideosComponent } from './components/videos/videos.component';
import { ColumnsComponent } from './components/columns/columns.component';


// Modals Components

// Pipes

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ErrorComponent,
    MenuComponent,
    TrendingComponent,
    ScrollBannerComponent,
    ColumnsComponent,
    FranchiseComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    VideosComponent,
    ColumnsComponent,
    AdvertisementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SlickCarouselModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuComponent,
    TrendingComponent,
    ScrollBannerComponent,
    AdvertisementComponent,
    ColumnsComponent,
    FranchiseComponent,
    TrendingBuzzComponent,
    DefaultImagePipe,
    SlickCarouselModule,
    VideosComponent,
    ColumnsComponent
  ],
})
export class SharedModule {}
