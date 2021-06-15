import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  //Header API
  getHeader() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/header`)
      .pipe(
        map((result: any) => {
          return result.data;
        })
      );
  };

  //Sidebar API
  getSidebar() {
    return this.http
    .get<any>(`${environment.apiUrl}/1851/sidebar`)
    .pipe(
      map((result:any) => {
        return result.data;
      })
    );
  };

  //Footer API
  getFooter() {
    return this.http
    .get<any>(`${environment.apiUrl}/1851/footer`)
    .pipe(
      map((result:any) => {
        return result.data;
      })
    );
  };

  //Publication API
  getPublication() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/publication-instance`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };

  //Advertisement  API
  getAds() {
    return this.http
      .get<any>(`${environment.apiUrl}/1851/ads`)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  };
}

