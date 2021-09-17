import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
=======
import { AuthorComponent } from './author.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorRoutingModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
