import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DefaultImagePipe } from 'src/app/_core/pipes/default-image.pipe';

//components
import { FeaturedComponent } from './components/featured/featured.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { EditorialSectionsComponent } from './components/editorial-sections/editorial-sections.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    DefaultImagePipe,
    MostPopularComponent,
    DefaultImagePipe,
    EditorialSectionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CarouselModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    MostPopularComponent,
    DefaultImagePipe,
    EditorialSectionsComponent,
  ],
})
export class SharedModule {}
