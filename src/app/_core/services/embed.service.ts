import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmbedService {
  constructor() {}

  getVimeoId(url) {
    const match = /vimeo.*\/(\d+)/i.exec(url);
    if (match) {
      return match[1];
    }
  }

  convertVimeo(url) {
    const vimeoUrl = url.split('</figure>');
    const id = this.getVimeoId(vimeoUrl[0]);
    // tslint:disable-next-line:max-line-length
    return `<iframe src="https://player.vimeo.com/video/${id}" width="560" height="315"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  embedVimeo(content) {
    const oembed_vimeo =
      /url="https?:\/\/(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)(.)"><\/oembed>/g;
    const array = content.split('<figure class="media"><oembed ');
    let temp = '';
    if (array.length < 2) {
      return content;
    }
    for (let i = 0; i < array.length; i++) {
      const iframe = this.convertVimeo(array[i]);
      if (array[i].indexOf(`vimeo.com`) !== -1) {
        temp += `<figure class=\"media\">`;
        temp += array[i].replace(oembed_vimeo, iframe);
      } else {
        temp += array[i].replace(oembed_vimeo, iframe);
      }
    }
    return temp;
  }

  embedYoutube(content) {
    const regex = [
      /<oembed url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g,
      /<oembed url="https?:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})"><\/oembed>/g,
      /<oembed url="https:\/\/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g,
      /<oembed url="https:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})"><\/oembed>/g,
      /<oembed url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})\&amp;feature=youtu\.be"><\/oembed>/g,
      /<oembed url="https?:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})\&amp;feature=youtu\.be"><\/oembed>/g,
      /<oembed url="https:\/\/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})\&amp;feature=youtu\.be"><\/oembed>/g,
      /<oembed url="https:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})\&amp;feature=youtu\.be"><\/oembed>/g,
    ];
    // tslint:disable-next-line:max-line-length
    const oembed_iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    for (let i = 0; i < regex.length; i++) {
      content = content.replace(regex[i], oembed_iframe);
    }
    return content;
  }
}
