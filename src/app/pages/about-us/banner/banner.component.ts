import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() data: any = [];
  @Output() imageLoad = new EventEmitter();

  showVideo: Boolean = false;
  showRtPanel: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  onModalHide() {
    this.showVideo = false;
  }

  imageLoaded() {
    this.showRtPanel = true;
    this.imageLoad.emit();
  }
}
