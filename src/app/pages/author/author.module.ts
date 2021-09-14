import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [CommonModule, SharedModule, NgxJsonLdModule, AuthorRoutingModule],
})
export class AuthorModule {}
