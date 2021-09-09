import { Content } from './content.model';
import { Media } from "./media.model";

export interface Terms {
  data?: any;
  content?: Content;
  ga_code?: string;
  media?: Media;
}
