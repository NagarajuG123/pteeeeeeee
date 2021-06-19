import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private title: Title,
    private meta: Meta,
  ) { }

  setSeo(data: any) {
    this.title.setTitle(data.seo.title);
    this.meta.addTags([
      {name: 'keywords', content: data.seo.keywords},
      { name: 'description', content: data.seo.description },
       {name: 'author', content: data.seo.author},
      { name: 'robots', content: data.seo.robots },
       {name: 'referrer', content: data.seo.referrer}
    ]);
  }
}
