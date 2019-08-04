import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Mapdata } from '../todo-class/mapdata';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class MapDataService {

  private mapdatasUrl = 'api/mapdatas';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET mapdatas from the server */
  getMapdatas(): Observable<Mapdata[]> {
    return this.http.get<Mapdata[]>(this.mapdatasUrl)
      .pipe(
        tap(_ => this.log('fetched mapdatas')),
        catchError(this.handleError<Mapdata[]>('getMapdatas', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  // getMapdata(id_super_zone: number): Observable<Mapdata> {
  //   const url = `${this.mapdatasUrl}/${id_super_zone}`;
  //   return this.http.get<Mapdata>(url).pipe(
  //     tap(_ => this.log(`fetched mapdata id_super_zone=${id_super_zone}`)),
  //     catchError(this.handleError<Mapdata>(`getMapdata id_super_zone=${id_super_zone}`))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MapDataService: ${message}`);
  }

}
