import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Observable, BehaviorSubject, of, throwError, empty, TimeoutError } from 'rxjs';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';

const defaultTimeout = 5000;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
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

  //Trending API
  getTrending(){
    return this.http
    .get<any>(`${environment.apiUrl}/1851/trending`)
    .pipe(
      map((result: any) => {
        return result;
      })
    );
  };

  getAPI(endpoint: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${endpoint}`, this.httpOptions)
    .pipe(
      timeout(defaultTimeout),
      retry(1),
      catchError(err => this.handleError(err, endpoint))
    );
  };
  handleError(error: { status: any; message: any; }, endpoint: string) {
    let errorMessage = '';
    if (error instanceof TimeoutError) {
      return empty();
    }
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(errorMessage);
  }
}

