import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Fish } from './fish';

/*
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
*/

@Injectable({
  providedIn: 'root',
})

export class PostsService {

private fishesUrl = 'api/NameSpecie'; // URL to web API
//  private fishesUrl = 'api/fishes'; // URL to 'in-memory-data.service' API

  constructor(
    // private http: Http
    private http: HttpClient,
    ) { }


  /* GET heroes whose name contains search term */
  searchFishes(term: string): Observable<Fish[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Fish[]>(`${this.fishesUrl}/?name_specie=${term}`).pipe(
      tap(_ => this.log(`found fishes matching "${term}"`)),
      catchError(this.handleError<Fish[]>('searchFishes', []))
    );
  }

/*  getHeroes(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.fishesUrl)
    .pipe(
      tap(fishes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }
*/
/*
  getHeroes(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.fishesUrl);
  }
*/

    /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Fish> {
    const url = `${this.fishesUrl}/${id}`;
    return this.http.get<Fish>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Fish>(`getHero id=${id}`))
    );
  }


  // Get all posts from the API
  // partie back-end (route qui affiche les infos au format '.json'.
  // Elles seront récupérées par le Front-End pour être affichée sur 'localhost:3000/posts'

  /* GET fishes whose name contains search term */
  getAllSpecies(term: string): Observable<Fish[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
    { params: new HttpParams().set('', term) } : {};

    return this.http.get<Fish[]>('api/NameSpecie', options)
    .pipe(
      catchError(this.handleError<Fish[]>('getAllSpecies', []))
    );
  }

/*
  // ne marche pas : (à retester au besoin)
  getAllPosts(): Observable<Object> {
    return this.http.get('/api/AllFishings');
  }
*/

// ************************************

/*
  getAllFishings() {
    return this.http.get('/api/AllFishings'); // REQUÊTE GÉNÉRALE : 'AllFishings'
    .map(res => res.json());
  }
*/
  getSomeFishings() {
    return this.http.get('/api/CodAtZone'); // REQUÊTE PRÉCISE : 'NorthSeaCodAtDate'
  // .map(res => res.json());
  }

  getOneFishing() {
    return this.http.get('/api/NorthSeaCodAtDate'); // REQUÊTE PRÉCISE : 'NorthSeaCodAtDate'
//  .map(res => res.json());
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

}
