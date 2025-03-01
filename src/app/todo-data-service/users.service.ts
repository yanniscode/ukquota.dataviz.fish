import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import { environment } from 'src/environments/environment';

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

  // static getLogin(login: AbstractControl, mail: AbstractControl) {
  //   throw new Error("Method not implemented.");
  // }

  // addrUrl: string = environment.backend.baseURL;
  
  // usersUrl: string = this.addrUrl +'/users-api/AllUsers';

  private user$: User[];
  private user: User;

  private handleError: HandleError;

  public constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    
    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('UsersService');

    this.user$ = [];

    this.user = {
      id_user: 0, 
      user_firstname: '', 
      user_lastname: '', 
      login: '', 
      password: '', 
      mail: '',
      role: '',
    }

  }



  // **************************************************************************************************************** //

  // REQUETE GÉNÉRIQUE (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

  // **************************************************************************************************************** //

  getUsers(): Observable<User[]> {

    return this.http.post<User[]>('users-api/AllUsers', httpOptions)
    .pipe(
      catchError(
        this.handleError('getUsers', []),
      ),
    );
  };


  // public getAllUsers(): Observable<User[]> {

  //   return this.http.get('users-api/AllUsers')
  //   .pipe(
  //     map(
  //       (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
  //     ),
  //     catchError(
  //       this.handleError<User[]>('getAllUsers', []),
  //     ),
  //   );
  // };

  
  // *** Pour la connexion à l'espace (user):
  public getUser(login: string, mail: string): Observable<User[]> {

    this.user.login = login;
    this.user.mail = mail;

    return this.http.post<User[]>('users-api/User', this.user, httpOptions)
    .pipe(  
      catchError(
        this.handleError<User[]>('getUser', this.user$),
      ),    
    );    
  };


    // *** Pour la connexion à l'espace (admin):
    public getAdmin(login: string, mail: string): Observable<User[]> {
  
      this.user.login = login;
      this.user.mail = mail;

      return this.http.post<User[]>('users-api/Admin/', this.user, httpOptions)
      .pipe(      
        catchError(
          this.handleError<User[]>('getAdmin', this.user$),
        ),   
      );
    };


  /* insertion : méthode 'GET' */
  // public getLoginTest(login: string): Observable<User[]> {

  //   return this.http.get<User[]>('users-api/SingleLoginTest/'+ login)
  //   .pipe(
  //     map(
  //       (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
  //     ),
  //     catchError(
  //       this.handleError<User[]>('getLoginTest', []),
  //     ),    
  //   );
  // };


  deleteUser(user: User): Observable<User> {

    return this.http.post<User>('users-api/DeleteUser', user, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser', user),
      ),
    );
  };

  // *** utilisée dans 'Members-list':
  deleteUserByTable(user: User): Observable<User> {

    const url = `users-api/DeleteUserByTable/${ user.id_user }`;
    
    return this.http.delete<User>(url, httpOptions)
    .pipe(
      catchError(
        this.handleError('deleteUserByTable', user),
      ),
    );
  };


  // Utilisé (autocomplete form)...
  deleteUserByLogin(login: string): Observable<User[]> {

    const url = 'users-api/DeleteUser/'+login;
    
    return this.http.delete<User[]>(url, httpOptions)
    .pipe(
      // map(
      //   (jsonArray: Object[]) => jsonArray.map(jsonItem => User.fromJson(jsonItem)),
      // ),
      catchError(
        this.handleError<User[]>('deleteUserByLogin', []),
      ),    
    );
  };


  /* insertion user : méthode 'POST' */
  addUser(user: User): Observable<User> {
    
    return this.http.post<User>('users-api/AddUser', user, httpOptions)
    .pipe(   
      catchError(
        this.handleError('addUser', user),
      ),
    );
  };


  updateUser(user: User): Observable<User> {
    httpOptions.headers = httpOptions.headers.set('Autorization', 'my-new-auth-token');

    return this.http.put<User>('users-api/UpdateUser', user, httpOptions)
    .pipe(
      catchError(
        this.handleError('updateUser', user),
      ),
    );
  };


  /* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
  public getSingleUserLogin(login: string): Observable<User[]> {

    this.user.login = login;

    return this.http.post<User[]>('users-api/SingleUserLogin', this.user, httpOptions)
    .pipe(
      catchError(
        this.handleError<User[]>('getSingleUserLogin', this.user$),
      ),
    );
  };


  /* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE MAIL DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN MAIL) : méthode 'GET' */
  public getSingleUserMail(mail: string): Observable<User[]> {

    this.user.mail = mail;

      return this.http.post<User[]>('users-api/SingleUserMail', this.user, httpOptions)
      .pipe(
        // map(
        //   (jsonArray: Object[]) => jsonArray.map(
        //     jsonItem => User.fromJson(jsonItem),
        // ),
        catchError(
          this.handleError<User[]>('getSingleUserMail', this.user$),
        ),
      );
    };


}
