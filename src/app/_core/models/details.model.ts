import { SafeHtml } from "@angular/platform-browser";
import { Media } from "./media.model";
import { Brand } from "./brand.model";
import { Author } from "./author.model";
import { Category } from "./category.model";

export interface Details {
  id?: string;
  title?: string;
  short_description?: string;
  content?: SafeHtml;
  date_time?: string;
  last_modified?: string;
  media?: Media;
  brand?: Brand;
  author?: Author;
  category?: Category;
  sponsorship?: boolean;
  slug?: string;
}
