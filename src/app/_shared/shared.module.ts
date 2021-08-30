import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';

//components
import { FeaturedComponent } from './components/featured/featured.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MostPapularComponent } from './components/most-papular/most-papular.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [
    FeaturedComponent,
    HeaderComponent,
    FooterComponent,
    MostPapularComponent,
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
    MostPapularComponent,
  ],
})
export class SharedModule {}
