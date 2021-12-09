import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable, throwError, empty, TimeoutError } from 'rxjs';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';

const defaultTimeout = 5000;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getAPI(endpoint: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${endpoint}`, this.httpOptions)
      .pipe(
        timeout(defaultTimeout),
        retry(1),
        catchError((err) => this.handleError(err, endpoint))
      );
  }

  getAPI2(endpoint: string): Observable<any> {
    return this.http
      .get(`${environment.api2Url}/${endpoint}`, this.httpOptions)
      .pipe(
        timeout(defaultTimeout),
        retry(1),
        catchError((err) => this.handleError(err, endpoint))
      );
  }
  postAPI(endpoint: string, payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/${endpoint}`,
        JSON.stringify(payload),
        this.httpOptions
      )
      .pipe(
        timeout(defaultTimeout),
        retry(1),
        catchError((err) => this.handleError(err, endpoint))
      );
  }

  handleError(error: { status: any; message: any }, endpoint: string) {
    let errorMessage = '';
    if (error instanceof TimeoutError) {
      return empty();
    }
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(errorMessage);
  }
}
