import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarData: any =[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSidebar();
  }
 
  getSidebar() {
    this.apiService.getSidebar().subscribe((response) => {
      this.sidebarData = response;
    });
  }
}