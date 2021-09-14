import { Content } from "@angular/compiler/src/render3/r3_ast";

export interface Brandsrank{
    id?: string;
    rank?: number;
    name?: string;
    slug?: string;
    last_week_rank?: number;
    latest_story_title?: string;
    latest_story?: Content;
}