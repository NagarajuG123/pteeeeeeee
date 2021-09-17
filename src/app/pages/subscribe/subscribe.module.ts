import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './subscribe.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { SubscribeRoutingModule } from './subscribe-routing.module';

@NgModule({
  declarations: [SubscribeComponent],
  imports: [CommonModule, SharedModule, SubscribeRoutingModule],
})
export class SubscribeModule {}
