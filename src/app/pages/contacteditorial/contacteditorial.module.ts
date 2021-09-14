import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacteditorialComponent } from './contacteditorial.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormComponent } from './form/form.component';
import { ContacteditorialRoutingModule } from './contacteditorial-routing.module';

@NgModule({
  declarations: [ContacteditorialComponent, FormComponent],
  imports: [CommonModule, SharedModule, ContacteditorialRoutingModule],
})
export class ContacteditorialModule {}
