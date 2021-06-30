import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  @Input() data: any;
  @Output() imageLoaded = new EventEmitter();
  publication_contents: any = [];
  loadedImageNum = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data?.contents?.length > 0) {
      for (let i = 1; i < this.data.contents.length; i++) {
        this.publication_contents.push(this.data.contents[i]);
      }
    }
  }
imageLoad() {
    this.loadedImageNum++;
    if (this.loadedImageNum === this.publication_contents.length) {
      this.imageLoaded.emit();
    }
  }
}
