import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
  }

 // Footer API 
  getFooter() {
    this.apiService.getFooter().subscribe((response) => {
      this.footerData = response;
    });
  } 

  //Publication Instance
  getPublication() {
    this.apiService.getPublication().subscribe((response) => {
      this.publication = response;
    });
  }
}