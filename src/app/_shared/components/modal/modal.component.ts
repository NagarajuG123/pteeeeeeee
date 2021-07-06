import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() openVideoPlayer: boolean = false;
  @Input() url: string = '';
  @Output() videoOutput = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.url)
  }

}
