import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [StoryComponent, ItemComponent],
  imports: [CommonModule, SharedModule, InfiniteScrollModule],
})
export class StoryModule {}
