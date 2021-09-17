import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsofuseComponent } from './termsofuse.component';

const routes: Routes = [
  {
    path: '',
    component: TermsofuseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsofuseRoutingModule { }
