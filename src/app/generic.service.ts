import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
export class GenericService<T> {

  private apiUrl: string;

  constructor(private http: HttpClient, path: string) {
    this.apiUrl = `http://localhost:8080${path}`

  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item).pipe(
      catchError(this.handleError('create', item))
    );
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getById', {}))
    );
  }

  update(id: number, item: T): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<T>(url, item).pipe(
      catchError(this.handleError('update', item))
    );
  }

  delete(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError('delete'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}
