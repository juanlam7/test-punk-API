import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Ibeer } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BeersService {
  apiURL = 'https://api.punkapi.com/v2';

  constructor(private http: HttpClient) {}

  getBeersByFood(food: string = ''): Observable<Ibeer[]> {
    const checkQueryParam: string = food.length > 0 ? `/beers?food=${food}` : '/beers';
    return this.http.get<Ibeer[]>(this.apiURL + checkQueryParam).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
