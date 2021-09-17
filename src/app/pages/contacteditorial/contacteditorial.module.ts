import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacteditorialComponent } from './contacteditorial.component';
import { SharedModule } from 'src/app/_shared/shared.module';
<<<<<<< HEAD

@NgModule({
  declarations: [ContacteditorialComponent],
  imports: [CommonModule, SharedModule],
=======
import { FormComponent } from './form/form.component';
import { ContacteditorialRoutingModule } from './contacteditorial-routing.module';

@NgModule({
  declarations: [ContacteditorialComponent, FormComponent],
  imports: [CommonModule, SharedModule, ContacteditorialRoutingModule],
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
})
export class ContacteditorialModule {}
