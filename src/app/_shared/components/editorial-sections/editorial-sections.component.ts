import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editorial-sections',
  templateUrl: './editorial-sections.component.html',
  styleUrls: ['./editorial-sections.component.scss'],
})
export class EditorialSectionsComponent implements OnInit {
  tabsName = tabsName;
  noOfTabsShow = 5;
  activeTab = 1;
  constructor() {}

  ngOnInit(): void {}

  prev() {
    console.log('prev');
    this.noOfTabsShow -= 1;
  }
  next() {
    console.log('next');
    this.noOfTabsShow += 1;
  }
}

const tabsName = [
  { tabLabel: 'People' },
  { tabLabel: 'Franchisees' },
  { tabLabel: 'Franchisors' },
  { tabLabel: 'Industry' },
  { tabLabel: 'Columns' },
];
