import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
<<<<<<< HEAD



@NgModule({
  declarations: [
    StoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoryModule { }
=======
import { ItemComponent } from './item/item.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxJsonLdModule } from 'ngx-json-ld';

@NgModule({
  declarations: [StoryComponent, ItemComponent],
  imports: [CommonModule, SharedModule, InfiniteScrollModule, NgxJsonLdModule],
})
export class StoryModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
