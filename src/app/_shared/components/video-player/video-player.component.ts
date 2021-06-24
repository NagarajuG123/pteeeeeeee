import {
  Component, OnInit, Inject, PLATFORM_ID, Input,
OnDestroy, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

declare var Vimeo: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  private player!: YT.Player;

  @Input()
  srcUrl!: string;
  

  id = '';
  src = '';
  videoType = '';
  preload = 'auto';
  isBrowser = false;
  data:any;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const srcUrl: SimpleChange = changes.srcUrl;
    if (typeof srcUrl !== 'undefined' && typeof srcUrl.currentValue !== 'undefined') {
      this.src = srcUrl.currentValue;
    if (this.src.indexOf('youtube') !== -1) {
        this.videoType = 'youtube';
        const temp = this.src.split('/');
        this.id = temp[temp.length - 1];
        if (typeof this.player !== 'undefined') {
          this.player.cueVideoById(this.id);
        }
      } else if (this.src.indexOf('vimeo') !== -1) {
        this.videoType = 'vimeo';
        const opts = {
          url: this.src
        };
        setTimeout(() => {
          this.player = new Vimeo.Player('vimeo_player', opts);
        }, 200);
      } else {
        this.videoType = 'default';
      }
    }
  }
  videoPlayerInit(data: any) {
    
    this.data = data;
    this.data.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.data.getDefaultMedia().currentTime = 0;
    });

    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.data.play());
  }
 
  savePlayer(player: any) {
    this.player = player;
    if (this.id !== '') {
      this.player.cueVideoById(this.id);
    }
    return;
  }
  onStateChange(event: any) {
    if (event.data === 0 ) {
      this.player.cueVideoById(this.id);
    }
    return;
  }
}
