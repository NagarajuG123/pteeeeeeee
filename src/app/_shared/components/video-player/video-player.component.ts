import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  private player!: YT.Player;

  @Input() srcUrl!: string;

  id = '';
  videoType = '';
  preload = 'auto';
  data: any;

  constructor() {}

  ngOnInit(): void {
    if (this.srcUrl.indexOf('youtube') !== -1) {
      this.videoType = 'youtube';
      const temp = this.srcUrl.split('/');
      this.id = temp[temp.length - 1];
      if (typeof this.player !== 'undefined') {
        this.player.cueVideoById(this.id);
      }
    } else if (this.srcUrl.indexOf('vimeo') !== -1) {
      this.videoType = 'vimeo';
    } else {
      this.videoType = 'default';
    }
  }

  savePlayer(player: any) {
    this.player = player;
    if (this.id !== '') {
      this.player.cueVideoById(this.id);
    }
    return;
  }
  onStateChange(event: any) {
    if (event.data === 0) {
      this.player.cueVideoById(this.id);
    }
    return;
  }
}
