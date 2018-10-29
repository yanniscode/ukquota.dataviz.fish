import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // ajout (utile ?)

// ** AJOUTS :
import { Fish } from './fish';
// import { FISHES } from './mock-fishes';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LinechartComponent } from './linechart/linechart.component';

// **

@Injectable()
export class LinechartService {

      // constructor(private http: Http) { } (ORIGINEL)

      // ** AJOUT : */
  private fishesUrl = 'api/CodAtZone';  // URL to web api - ex: private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient) { }

  /* GET fishes whose name contains search term */
  searchFish(term: string): Observable<Fish[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log(Fish);
    return this.http.get<Fish[]>(`${this.fishesUrl}/?=${term}`).pipe(
      tap(_ => this.log(`found fishes matching "${term}"`)),
      catchError(this.handleError<Fish[]>('searchFishes', []))
    );
  }



/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
//    this.messageService.add(`HeroService: ${message}`);
  }





  /** GET 'fishes' whose name contains search term */
/*  searchFish (): Observable<any[]> {
    console.log(this.fishingUrl);
    return this.http.get<any[]>(this.fishingUrl);
  }
  */

/*  searchfish (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }
*/
    // ** FIN AJOUT */


  // Get all posts from the API == partie back-end (route qui affiche les infos au format '.json'.
  // Elles seront récupérées par le Front-End pour être affichée sur 'localhost:3000/graph'
  // ATTENTION : methode qui ne marche pas >> utiliser la classe LinechartComponent à la place (dans 'linechart.component.ts')

/*
  getAllFishings() {
    return this.http.get('/api/AllFishings') // objet 'fishing' (id, values, zone...)
      .map(res => res.json());
  }
  getOneFishing() {
    return this.http.get('/api/NorthSeaCodAtDate') // value_landing: 14712, date: "2017-11-15" (ex)
      .map(res => res.json());
  }
*/

}

