import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebar: any =[];
  publication: any=[];
  slug: string = '1851';

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
     this.getSidebar();
     this.getPublication();
  }
 
  //Publication Instance
  getPublication() {
    this.apiService.getAPI(`${this.slug}/publication-instance`).subscribe((response ) =>{
      this.publication = response;
    });
  }

  //Sidebar API
  getSidebar() {
    this.apiService.getAPI(`${this.slug}/sidebar`).subscribe((response ) =>{
      this.sidebar = response;
    });
  }

  closeMenu() {
    $('body').toggleClass('menu-open');
  }
}