import { Media } from "./media.model";

export interface Author {
  id?: string;
  name?: string;
  slug?: string;
  designation?: string;
  media?: Media;
}
