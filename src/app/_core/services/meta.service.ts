import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private title: Title, private meta: Meta) {}

  setSeo(data: any) {
    this.title.setTitle(data.seo.title);

    if (data.seo) {
      const seoKeys = Object.keys(data.seo);
      for (const key of seoKeys) {
        if (data.seo[key] !== null) {
          this.meta.updateTag(
            { name: key, content: data.seo[key] },
            `name='${key}'`
          );
        }
      }
    }
    if (data.og) {
      const ogKeys = Object.keys(data.og);
      for (const key of ogKeys) {
        if (key === 'media' && data.og[key] !== null) {
          this.meta.updateTag(
            {
              property: `og:image`,
              content: `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${data.og.media.url}`,
            },
            `property='og:image'`
          );
        } else if (data.og[key] !== null) {
          this.meta.updateTag(
            { property: `og:${key}`, content: data.og[key] },
            `property='og:${key}'`
          );
        }
      }
    }
    if (data.twitter) {
      const twitterKeys = Object.keys(data.twitter);
      for (const key of twitterKeys) {
        if (key === 'media' && data.twitter[key] !== null) {
          this.meta.updateTag(
            {
              name: `twitter:image`,
              content: `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${data.twitter['media']['url']}`,
            },
            `name='twitter:image'`
          );
        } else if (data.twitter[key] !== null) {
          this.meta.updateTag(
            { name: `twitter:${key}`, content: data.twitter[key] },
            `name='twitter:${key}'`
          );
        }
      }
    }
    if (data['fb-app-id']) {
      this.meta.updateTag(
        { property: 'fb:app_id', content: data['fb-app-id'] },
        `property='fb:app_id'`
      );
    }
  }

  setTitle(data: any) {
    this.title.setTitle(data);
  }

  updateTag(data, type) {
    this.meta.updateTag(data, type);
  }
}
