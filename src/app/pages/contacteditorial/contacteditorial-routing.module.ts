import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContacteditorialComponent } from './contacteditorial.component';

const routes: Routes = [
  {
    path: '',
    component: ContacteditorialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContacteditorialRoutingModule {}
