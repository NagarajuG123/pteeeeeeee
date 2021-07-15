import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacteditorialComponent } from './contacteditorial.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [ContacteditorialComponent, FormComponent],
  imports: [CommonModule, SharedModule],
})
export class ContacteditorialModule {}
