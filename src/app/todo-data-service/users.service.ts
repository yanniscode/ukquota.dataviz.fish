import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { User } from '../todo-class/user';

// const ALTER_LOGINS = [];

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})


export class UsersService {


  // layer: any;

  usersUrl = 'http://localhost:3000/users-api/AllUsers';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) { this.handleError = httpErrorHandler.createHandleError('UsersService');
  }

  // **************************************************************************************************************** //

  // REQUETE GÉNÉRIQUE (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

  // **************************************************************************************************************** //

  /* le login existe-t'il en BDD ?*/
  // isLoginTaken(login: string): Observable<boolean> {
  //   const isTaken = LOGINS.includes(login);
  //   return of(isTaken).pipe(delay(400));
  // }

  // ********* pour test (delete) :
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  // *********
  // test : MARCHE PAS (PAS DE FILTRAGE DE LA RECHERCHE SUR LE RÉSULTAT DONNÉ PAR L'API...)
  searchUsers(term:string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set('login', term) } : {};

    return this.http.get<User[]>(this.usersUrl, options)
    .pipe(
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  // **********

  public getAllUsers(): Observable<User[]> {
    return this.http.get('http://localhost:3000/users-api/AllUsers')
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      )
    );
    
    //  .map(res => JSON.stringify(res));

  }

  public getLogin(login: string, mail: string): Observable<User[]> {

    // let isTaken;
    // const isTaken = ALTER_LOGINS.includes(login);
    // isTaken = this.http.get<User[]>('http://localhost:3000/users-api/SingleLogin/' + login)

    return this.http.get<User[]>('http://localhost:3000/users-api/SingleLogin/' + login + '&' + mail)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      )
      
    );
    
    // if(isTaken !== '' || isTaken !== null || isTaken !== undefined) {
      // return of(isTaken).pipe(delay(400));
    // }
    

  }

  /* insertion : méthode 'GET' */
  public getLoginTest(login: string): Observable<User[]> {

    // let isTaken;
    // const isTaken = ALTER_LOGINS.includes(login);
    // isTaken = this.http.get<User[]>('http://localhost:3000/users-api/SingleLogin/'+ login)

    return this.http.get<User[]>('http://localhost:3000/users-api/SingleLoginTest/'+ login)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      )
      
    );

  // isAlterEgoTaken(alterEgo: string): Observable<boolean> {
  //   const isTaken = ALTER_EGOS.includes(alterEgo);
  //   return of(isTaken).pipe(delay(400));
  // }

  }


  deleteUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>('http://localhost:3000/users-api/DeleteUsers', user, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser', user))
      );
  }

  // MARCHE...
  deleteUser2(user: User): Observable<User> {
  // deleteUser2 (id_user: number): Observable<{}> {

    // const url = 'http://localhost:3000/users-api/AllUsers' + id_user;
    const url = `http://localhost:3000/users-api/AllUsers2/${ user.id_user }`;
    console.log(url);
    console.log(user.id_user);
    
    return this.http.delete<User>(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser2', user))
      );
  }

  // MARCHE (autocomplete form)...
  deleteUser3(login: string): Observable<User[]> {

    // const url = 'http://localhost:3000/users-api/AllUsers' + id_user;
    const url = `${this.usersUrl}/`+login;
    console.log(url);
    console.log(login);
    
    return this.http.delete<User[]>(url, httpOptions)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      ),
    )
  }

  /* insertion user : méthode 'POST' */
  addUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.usersUrl, user, httpOptions)
    // return this.http.post<User>('http://localhost:3000/users-api/SingleLoginTest', user, httpOptions)
      .pipe(   
        catchError(this.handleError('addUser', user))
      );
  }

  updateUser(user: User): Observable<User> {
    httpOptions.headers = httpOptions.headers.set('Autorization', 'my-new-auth-token');

    return this.http.put<User>(this.usersUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }




  /* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
  public getSingleUserLogin(login: string): Observable<User[]> {

    // let isTaken;
    // const isTaken = ALTER_LOGINS.includes(login);
    // isTaken = this.http.get<User[]>('http://localhost:3000/users-api/SingleLogin/'+ login)

    return this.http.get<User[]>('http://localhost:3000/users-api/SingleUserLogin/'+ login)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      )
      
    );

  // isAlterEgoTaken(alterEgo: string): Observable<boolean> {
  //   const isTaken = ALTER_EGOS.includes(alterEgo);
  //   return of(isTaken).pipe(delay(400));
  // }

  }


  /* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE MAIL DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN MAIL) : méthode 'GET' */
  public getSingleUserMail(mail: string): Observable<User[]> {

      return this.http.get<User[]>('http://localhost:3000/users-api/SingleUserMail/'+ mail)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
        )
        
      );
  
    }


}

// ******************************************

// les autres requetes possibles du CRUD (exemple) :


/*
  insertFish(fish: Fish): Observable<Fish> { // EXEMPLE NON UTILISÉ
    return this.http.post<Fish>('http://localhost:3000/api/fishes/', fish);
  }

  updateFish(fish: Fish): Observable<void> { // EXEMPLE NON UTILISÉ
    return this.http.put<void>('http://localhost:3000/api/fishes/' + fish.name_specie, fish);
  }

  deleteFish(name_specie: string) { // EXEMPLE NON UTILISÉ
    return this.http.delete('http://localhost:3000/api/fishes/' + name_specie);
  }

*/