import { Component, OnInit, Input } from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/FiveColumn';

@Component({
  selector: 'app-five-column',
  templateUrl: './five-column.component.html',
  styleUrls: ['./five-column.component.scss']
})
export class FiveColumnComponent implements OnInit {
  @Input() contents: FiveColumn[] = [];
  @Input() slug: string = '';
  @Input() type = '';
  constructor() { }

  ngOnInit(): void {
  }

}
