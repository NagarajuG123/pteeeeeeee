import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacteditorialComponent } from './contacteditorial.component';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [ContacteditorialComponent],
  imports: [CommonModule, SharedModule],
})
export class ContacteditorialModule {}
