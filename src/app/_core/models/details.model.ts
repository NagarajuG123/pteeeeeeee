import { SafeHtml } from "@angular/platform-browser";
import { Media } from "./media.model";

export interface Details {
  id?: string;
  title?: string;
  short_description?: string;
  content?: SafeHtml;
  category?: any;
  sponsorship?: any;
  author?: any;
  brand?: any;
  date_time?: string;
  last_modified?: string;
  media?: Media;
  slug?: string;
}
