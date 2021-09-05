import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
@Component({
  selector: 'app-editorial-sections',
  templateUrl: './editorial-sections.component.html',
  styleUrls: ['./editorial-sections.component.scss'],
})
export class EditorialSectionsComponent implements OnInit {
  tabsName = tabsName;
  tablist = tabsList;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.commonService.resizeSidebar(event.target.innerWidth);
  }
  setActiveTab(val: any) {
    this.activeTab = val;
  }
  prev() {
    if (this.skipTab > 0) {
      this.skipTab -= 1;
    } else this.skipTab = 0;
  }
  next() {
    if (this.skipTab < this.tabsName.length - this.commonService.vtabsItem) {
      this.skipTab += 1;
    }
  }
}

const tabsName = [
  { tabLabel: 'People' },
  { tabLabel: 'Franchisees' },
  { tabLabel: 'Franchisors' },
  { tabLabel: 'Industry' },
  { tabLabel: 'Columns' },
  { tabLabel: 'Columns N' },
];

const tabsList = [
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
  {
    title: 'LOREM IPSUM',
    detail: 'Title Lorem Ipsum: Conset Entumi Abudi',
    by: 'Lorem, ipsum',
  },
];
