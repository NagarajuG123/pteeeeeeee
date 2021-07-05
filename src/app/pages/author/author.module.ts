import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { SharedModule } from 'src/app/_shared/shared.module';



@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthorModule { }
