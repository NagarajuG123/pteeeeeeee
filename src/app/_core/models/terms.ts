import { SyncAsync } from '@angular/compiler/src/util';
import { Content } from './content';
import { Media } from "./media.model";

export interface Terms {
  data?: any;
  content?: Content;
  ga_code?: string;
  media?: Media;
}
