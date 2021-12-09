import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacteditorialComponent } from './contacteditorial.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { ContacteditorialRoutingModule } from './contacteditorial-routing.module';

@NgModule({
  declarations: [ContacteditorialComponent],
  imports: [CommonModule, SharedModule, ContacteditorialRoutingModule],
})
export class ContacteditorialModule {}
