import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribepageComponent } from './subscribepage.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '../home/home.module';

const routes: Routes = [
  {
    path: '**',
    component: SubscribepageComponent,
  }
];

@NgModule({
  declarations: [
    RouterModule,
    HomeModule,
    SubscribepageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubscribepageModule { }
