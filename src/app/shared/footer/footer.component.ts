import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   footerData: any =[];
   publication: any =[];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
     this.getFooter();
     this.getPublication();
  }

 // Footer API 
  getFooter() {
    let slug = '1851';
    this.apiService.getAPI(`${slug}/footer`).subscribe((response ) =>{
      this.publication = response;
    });
  } 

  //Publication Instance
  getPublication() {
    let slug = '1851';
    this.apiService.getAPI(`${slug}/publication-instance`).subscribe((response ) =>{
      this.publication = response;
    });
  }
}