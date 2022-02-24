import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetComponent } from './widget.component';

const routes: Routes = [
  {
    path: ':slug',
    component: WidgetComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }
