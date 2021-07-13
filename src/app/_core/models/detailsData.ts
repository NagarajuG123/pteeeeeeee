import { Media } from './media';
import { SafeHtml } from '@angular/platform-browser';

export interface DetailsData {
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
