import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { FeaturedComponent } from './components/featured/featured.component';

// Modals Components

// Pipes

@NgModule({
  declarations: [FeaturedComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturedComponent,
  ],
})
export class SharedModule {}
