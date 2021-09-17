import { SafeUrl } from "@angular/platform-browser";
import { Media } from "./media.model";
import { Story } from "./story.model";

export interface Cover {
    id?: string;
    date?: Date;
    url?: SafeUrl;
    media?: Media;
    story?: Story;
  }
  