import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() openVideoPlayer: boolean = false;
  @Input() url: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
