import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';

const defaultTimeout = 5000;

@Injectable({
  providedIn: 'root'
})
export class SpotlightService {

  constructor( private http: HttpClient,
    private router: Router ) { }

  //People Spotlight API
  getPeopleSpotlight() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/spotlight/people`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };

   //Column Spotlight API
   getColumnSpotlight() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/spotlight/columns`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };

   //Franchisor Spotlight API
   getFranchisorSpotlight() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/spotlight/franchisor`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };

   //Franchisee Spotlight API
   getFranchiseeSpotlight() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/spotlight/franchisee`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };

  //Industry Spotlight API
  getIndustrySpotlight() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/spotlight/industry`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };
}
