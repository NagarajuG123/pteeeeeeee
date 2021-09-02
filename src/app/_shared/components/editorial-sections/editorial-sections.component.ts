import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editorial-sections',
  templateUrl: './editorial-sections.component.html',
  styleUrls: ['./editorial-sections.component.scss'],
})
export class EditorialSectionsComponent implements OnInit {
  tabsName = tabsName;
  constructor() {}

  ngOnInit(): void {}
}

const tabsName = [
  { tabLabel: 'People' },
  { tabLabel: 'Franchisees' },
  { tabLabel: 'Franchisors' },
  { tabLabel: 'Industry' },
  { tabLabel: 'Columns' },
];
