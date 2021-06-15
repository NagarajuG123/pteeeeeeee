import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarData: any =[];
  publication: any=[];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
     this.getSidebar();
     this.getPublication();
  }
 
  //Sidebar API
  getSidebar() {
    this.apiService.getSidebar().subscribe((response) => {
      this.sidebarData = response;
      console.log(this.sidebarData);
    });
  }

  //Publication Instance
  getPublication() {
    this.apiService.getPublication().subscribe((response: any) => {
      this.publication = response;
      console.log(this.publication);
    });
  }

  closeMenu() {
   
  }
}