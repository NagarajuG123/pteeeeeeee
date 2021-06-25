import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
@Component({
  selector: 'app-contacteditorial',
  templateUrl: './contacteditorial.component.html',
  styleUrls: ['./contacteditorial.component.scss']
})
export class ContacteditorialComponent implements OnInit {
  contactData: any = [];
  slug = '1851';

  constructor( private apiService:ApiService) { }

  ngOnInit(): void {
    this.getContactEditorial();
  }

  getContactEditorial() {
    this.apiService.getAPI(`${this.slug}/contact-editorial`).subscribe((response ) =>{
      this.contactData = response
    });
  }
}
