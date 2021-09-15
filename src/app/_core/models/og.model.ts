import { SafeUrl } from "@angular/platform-browser";
import { Media } from "./media.model";

export interface Og {
    card: string;
    title: string;
    type: string;
    description: string;
    url: SafeUrl;
    media: Media;
    site_name: string;
  }
  