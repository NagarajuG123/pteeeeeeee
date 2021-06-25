import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacteditorialComponent } from './contacteditorial.component';
import { EditorialCalenderComponent } from './editorial-calender/editorial-calender.component';



@NgModule({
  declarations: [
    ContacteditorialComponent,
    EditorialCalenderComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ContacteditorialModule { }
