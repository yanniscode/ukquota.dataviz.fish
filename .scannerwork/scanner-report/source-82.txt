import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { debounceTime, map, startWith } from 'rxjs/operators';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { UsersService} from '../../../todo-data-service/users.service';
import { User } from '../../../shared/todo-class/user';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
  providers: [
    UsersService,  // *** Note: accès restreint au composant = plus sûr ?
  ]
})

export class MembersListComponent implements OnInit {

  private showDataUpdate: boolean = true;           // *** Note: bouton de mise à jour générale du tableau (utile après inscription)
  private showPreUpdateUserButton: boolean = false; // *** Note: pour le bouton de prévalidation
  private showUpdateUserButton: boolean = false; 
  private showCancelButton: boolean = false;

  // *** Note: CHAMPS AUTO-COMPLETE (MÉTHODE AVEC OBSERVABLE QUI MARCHE AVEC DES DONNÉES RÉELLES = objets en input)
  
  private editUser: User;
  private users: User[];

  // *** Note: variables à $ = pour observables :
  private data$: User[] = [];
  private user$: User[] = []; 

  private loginFilteredOptions: Observable<string[]> = null;
  private mailFilteredOptions: Observable<string[]> = null;

  private usersList: Observable<User[]>;

  // *** Note: formulaire (reactive-form):
  private modificationForm: FormGroup;

  private userFilterLogin: string[] = [];
  private userFilterMail: string[] = [];


  public constructor(
    private usersService: UsersService,
  ) {

    this.modificationForm = new FormGroup (
    {
      id_user: new FormControl(this.user$, []),
      login: new FormControl(this.user$, [
        Validators.required
      ]),
      mail: new FormControl(this.user$, [
        Validators.required,
        Validators.email
      ])
    });

    this.usersService = usersService;

    this.usersList = usersService.getUsers(); // *** Note: route de l'API (membres inscrits)

    this.loginFilteredOptions = this.login.valueChanges
    .pipe(
      startWith(''),
      map(value => this._loginFilter(value)),
      debounceTime(100),
    );

    this.mailFilteredOptions = this.mail.valueChanges
    .pipe(
      startWith(''),
      map(value => this._mailFilter(value)),
      debounceTime(100)
    );

  }

  // *** Note: écoute des valeurs du champs 'id_user':
  public get id_user(): FormControl {
    return this.modificationForm.get('id_user') as FormControl;
  }

  // *** Note: écoute des valeurs du champs 'login':
  public get login(): FormControl {
    return this.modificationForm.get('login') as FormControl;
  }

  // *** Note: écoute des valeurs du champs 'mail':
  public get mail(): FormControl {
    return this.modificationForm.get('mail') as FormControl;
  }

    
  // *** Note: RECHERCHE LES CHAMPS CORRESPONDANTS AU MOYEN DES MÉTHODES DU FICHIER 'users.service.ts' (= TABLEAU DE STRINGS)
  private _loginFilter(value: string): string[] {

    const loginDatas: User[] = this.data$;
    const userData: Array<string> = [];

    for (let i: number = 0; i < loginDatas.length; i++) {
      userData.push(loginDatas[i].login);
    }

    const filterValue: string = value.toLowerCase();
    
    return this.userFilterLogin = userData.filter(user => user
      .toLowerCase()
      .includes(filterValue));
  }


  private _mailFilter(value: string): string[] {

    const mailDatas: User[] = this.data$;

    const userData: Array<string> = [];

    for (let i: number = 0; i < mailDatas.length; i++) {
      userData.push(mailDatas[i].mail);
    }

    const filterValue: string = value.toLowerCase();
    
    return this.userFilterMail = userData.filter(user => user
      .toLowerCase()
      .includes(filterValue));
  }


  // *** Note: APPEL DES DONNÉES GÉNÉRALES SUR LES UTILISATEURS:
  private getUsers(): User[] {
  
    const usersDataSubscription: Subscription = this.usersList
      .subscribe(users => { 
        this.users = users
    });
    
    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);

    return this.users;
  }


  
  public ngOnInit(): void {
    // console.log("member list:  ngOnInit() !");

    this.getUsers();

    return;
  }


private onPreDelete(user: User): void {

  if (confirm('Souhaitez-vous vraiment supprimer ce membre ?')) {

    // *** Note: effacement du membre par appel de la méthode 'onDelete(login)':
    this.onDeleteUserByUser(user);

  } else {

    this.showDataUpdate = true;
    this.showPreUpdateUserButton = false;
    this.showUpdateUserButton = false;
    this.showCancelButton = false;
  }

  return;
}


  onDeleteUserByUser(user: User): void {

    this.users = this.users.filter(u => u !== user);
    const usersDataSubscription: Subscription = this.usersService
      .deleteUserByTable(user)
      .subscribe();

    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);

    this.editUser == undefined;

    this.showDataUpdate = true;
    this.showPreUpdateUserButton = false;
    this.showUpdateUserButton = false;
    this.showCancelButton = false;

    return;
  }



  // *** Note: Nécessaire pour l'update:
  onEdit(user: User): void {
    
    if(this.editUser == undefined) { // *** Note: this.editUser == undefined = important pour éviter des problèmes de confusion dans les tuples à éditer

      this.editUser = user;

      this.login.patchValue(this.editUser.login);
      this.mail.patchValue(this.editUser.mail);

      this.showDataUpdate = false;
      this.showPreUpdateUserButton = true;
      this.showUpdateUserButton = false;
      this.showCancelButton = true;

    }

    return;
  }


  public onPreUpdate(): void {

    if(this.editUser === undefined ) {

      this.showDataUpdate = false;
      this.showPreUpdateUserButton = false;
      this.showUpdateUserButton = false; // *** Note: le bouton update (User) ne disparait pas.
      this.showCancelButton = true;

    } else if(this.editUser.login === null || this.editUser.login === undefined || this.editUser.mail === null || this.editUser.mail === undefined) {

      this.showDataUpdate = false;

      this.showPreUpdateUserButton = false;
      this.showUpdateUserButton = false; // *** Note: le bouton 'update' (User) disparait.
      this.showCancelButton = true;

    } else if(this.editUser.login !== null && this.editUser.login !== undefined && this.editUser.mail !== null && this.editUser.mail !== undefined) {

      this.editUser.login = this.modificationForm.value.login;
      this.editUser.mail = this.modificationForm.value.mail;
      
      // *** Note: le bouton Pre-update disparait (si utilisé...), puis le bouton Update apparait :
      this.showDataUpdate = false;

      this.showPreUpdateUserButton = false;
      this.showUpdateUserButton = true;
      this.showCancelButton = true;
    }

    return;
  }

  onUpdateMember(): void {
 
    if (this.editUser) {

      setTimeout(() => {
        this.getUsers();
      }, 2000);  // *** Note: 2000 = 2 secondes de délai avant le chargement

      const usersDataSubscription: Subscription = this.usersService
        .updateUser(this.editUser) // editUser: User (type)
        .subscribe(user => {

          const ix: number = user ? this.users.findIndex(u => u.id_user === user.id_user) : -1;
          
          if(ix > -1) {
            this.users[ix] = user;
          }

        }
      );

      setTimeout(() => {
        usersDataSubscription.unsubscribe();
      }, 10000);

      // *** Note: réinitialisation du membre édité:
      this.editUser = undefined;
      this.modificationForm.reset({ login: '', mail: '' }); // *** Note: le contenu des champs est effacé

    }

    this.showDataUpdate = true;

    this.showPreUpdateUserButton = false;
    this.showUpdateUserButton = false;
    this.showCancelButton = false;

    return;
  }

  onUpdateList(): void {

    // console.log("update list ok!");

    this.editUser = undefined;

    this.getUsers();

    this.showDataUpdate = true;

    this.showPreUpdateUserButton = false;
    this.showUpdateUserButton = false;
    this.showCancelButton = false;

    return;
  }

  public onResetAction(): void {

    // *** Note: Cette fois, le bouton Update disparait, le bouton Pre-Update apparait :

    this.editUser = undefined; // *** Note: réinitialisation de la variable

    this.modificationForm.reset({ login: '', mail: '' }); // *** Note: le contenu des champs est effacé

    this.showDataUpdate = true;

    this.showPreUpdateUserButton = false;
    this.showUpdateUserButton = false;
    this.showCancelButton = false;

    return;
  }


}
