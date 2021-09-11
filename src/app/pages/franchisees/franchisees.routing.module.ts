import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FranchiseesComponent } from './franchisees.component';

const routes: Routes = [
  {
    path:'',
    component:FranchiseesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseesRoutingModule {

 }
