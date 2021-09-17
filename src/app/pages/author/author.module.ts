import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';


@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
=======
import { AuthorComponent } from './author.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [CommonModule, SharedModule, NgxJsonLdModule, AuthorRoutingModule],
})
export class AuthorModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
