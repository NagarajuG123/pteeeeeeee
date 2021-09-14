import { Brandsrank } from "./brandsrank.model";
import { Media } from "./media.model";

export interface Powerranking{
    title?: string;
    short_description?: string;
    media?: Media;
    rank_start_from?: Date;
    rank_start_to?: Date;
    brands?: Brandsrank;
}