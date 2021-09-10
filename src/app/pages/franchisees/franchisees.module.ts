import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FranchiseesComponent } from './franchisees.component';
import { FranchiseesRoutingModule } from './franchisees.routing.module';



@NgModule({
  declarations: [
    FranchiseesComponent
  ],
  imports: [
    CommonModule,
    FranchiseesRoutingModule
  ]
})
export class FranchiseesModule { }
