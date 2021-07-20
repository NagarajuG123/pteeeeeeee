import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalId: string = '';
  @Input() videoUrl: string = '';
  openVideoPlayer: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
