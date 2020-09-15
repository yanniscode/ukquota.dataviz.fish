import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../shared/todo-class/user';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',  // *** Note: ou bien 'any' pour plus de flexibilité : eager load / lazy load (Angular 9, pas pour le 8 apparemment) 
})

export class UsersService {
  static getLogin(login: AbstractControl, mail: AbstractControl) {
    throw new Error("Method not implemented.");
  }


  usersUrl: string = 'http://localhost:3000/users-api/AllUsers';

  private handleError: HandleError;

  public constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }



  // **************************************************************************************************************** //

  // REQUETE GÉNÉRIQUE (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

  // **************************************************************************************************************** //

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      catchError(
        this.handleError('getUsers', []),
      ),
    );
  };


  public getAllUsers(): Observable<User[]> {

    return this.http.get('http://localhost:3000/users-api/AllUsers')
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      ),
      catchError(
        this.handleError<User[]>('getAllUsers', []),
      ),
    );
  };

  
  // *** Pour la connexion à l'espace (user):
  public getLogin(login: string, mail: string): Observable<User[]> {

    return this.http.get<User[]>('http://localhost:3000/users-api/SingleLogin/' + login + '&' + mail)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      ),      
      catchError(
        this.handleError<User[]>('getLogin', []),
      ),    
    );    
  };


    // *** Pour la connexion à l'espace (admin):
    public getAdminLogin(login: string, mail: string): Observable<User[]> {
  
      return this.http.get<User[]>('http://localhost:3000/users-api/SingleAdminLogin/' + login + '&' + mail)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
        ),      
        catchError(
          this.handleError<User[]>('getLogin', []),
        ),   
      );
    };


  /* insertion : méthode 'GET' */
  public getLoginTest(login: string): Observable<User[]> {

    return this.http.get<User[]>('http://localhost:3000/users-api/SingleLoginTest/'+ login)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      ),
      catchError(
        this.handleError<User[]>('getLoginTest', []),
      ),    
    );
  };


  deleteUser(user: User): Observable<User> {

    return this.http.post<User>('http://localhost:3000/users-api/DeleteUsers', user, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser', user),
      ),
    );
  };


  deleteUser2(user: User): Observable<User> {

    const url = `http://localhost:3000/users-api/AllUsers2/${ user.id_user }`;
    
    return this.http.delete<User>(url, httpOptions)
    .pipe(
      catchError(
        this.handleError('deleteUser2', user),
      ),
    );
  };


  // MARCHE (autocomplete form)...
  deleteUserByLogin(login: string): Observable<User[]> {

    const url = `${this.usersUrl}/`+login;
    
    return this.http.delete<User[]>(url, httpOptions)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      ),
      catchError(
        this.handleError<User[]>('deleteUser3', []),
      ),    
    );
  };


  /* insertion user : méthode 'POST' */
  addUser(user: User): Observable<User> {
    
    return this.http.post<User>(this.usersUrl, user, httpOptions)
    .pipe(   
      catchError(
        this.handleError('addUser', user),
      ),
    );
  };


  updateUser(user: User): Observable<User> {
    httpOptions.headers = httpOptions.headers.set('Autorization', 'my-new-auth-token');

    return this.http.put<User>(this.usersUrl, user, httpOptions)
    .pipe(
      catchError(
        this.handleError('updateUser', user),
      ),
    );
  };


  /* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
  public getSingleUserLogin(login: string): Observable<User[]> {

    return this.http.get<User[]>('http://localhost:3000/users-api/SingleUserLogin/'+ login)
    .pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(
          jsonItem => User.fromJson(jsonItem),
        ),
      ),
      catchError(
        this.handleError<User[]>('getSingleUserLogin', []),
      ),
    );
  };


  /* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE MAIL DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN MAIL) : méthode 'GET' */
  public getSingleUserMail(mail: string): Observable<User[]> {

      return this.http.get<User[]>('http://localhost:3000/users-api/SingleUserMail/'+ mail)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(
            jsonItem => User.fromJson(jsonItem),
          ),
          catchError(this.handleError<User[]>('getSingleUserMail', []),
          ),
        ),
      );
    };


}
