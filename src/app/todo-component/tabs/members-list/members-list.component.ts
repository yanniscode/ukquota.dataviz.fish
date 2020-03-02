import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { User } from '../../../todo-class/user';
import { UsersService} from '../../../todo-data-service/users.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})

export class MembersListComponent implements OnInit {

  // CHAMPS AUTO-COMPLETE (MÉTHODE AVEC OBSERVABLE QUI MARCHE AVEC DES DONNÉES RÉELLES = objets en input)
  
  user = { 
    id_user: '', 
    user_firstname: '',
    user_lastname: '', 
    login: '',
    password: '', 
    mail: ''
  };

  editUser: User;

  // pour observables (variables avec $):
  public user$: User[];
  public data$: any = []; // nécessaire sous ce type (any - les autres ne semblent pas marcher...) (tableau vide) car utilisé pour filtrer les données saisies (_loginFilter, _mailFilter)

  loginFilteredOptions: Observable<User[]>;
  // loginFilteredOptions: Observable<any>;
  mailFilteredOptions: Observable<User[]>;

  /* MÉTHODE POUR AVOIR UN FORMULAIRE  :*/

  // modificationForm: FormGroup;

  modificationForm = new FormGroup (
  {
    id_user: new FormControl(this.user.id_user, [
      Validators.required
    ]),
    login: new FormControl(this.user.login, [
      Validators.required
    ]),
    mail: new FormControl(this.user.mail, [
      Validators.required,
      Validators.email
    ])
  });

  // AUTRE FORME POSSIBLE (A VOIR)
  // modificationForm = this.fb.group({ // groupe de champs de recherches pour la validation d'un formulaire 'réactif'
  //   //  firstName: ['', Validators.required], // exemple de champs simple, à la différence des tableaux de données utilisés ici :
  //   login: ['', Validators.required]
  // });

  // get login() {
  //   return this.inscriptionForm.get('login') as FormControl;
  // }



  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
    // this.usersService.getUsers()
    //   .subscribe(data$ => {  // indiquer ici la route vers l'api choisie
    //   this.data$ = data$;
    // });
  }

  // ECOUTE DES VALEURS DU CHAMPS LOGIN
  get login() {
    return this.modificationForm.get('login') as FormControl;
  }

  // ECOUTE DES VALEURS DU CHAMPS MAIL
  get mail() {
    return this.modificationForm.get('mail') as FormControl;
  }

  // https://angular.io/guide/template-syntax : rendre la liste plus efficace... UTILE (A RETESTER) ??
  trackByItems(user: User): number { return user.id_user; }



  // RECHERCHE LES CHAMPS CORRESPONDANTS AU MOYEN DES MÉTHODES DU FICHIER 'users.service.ts' (= TABLEAU DE STRINGS)
  private _loginFilter(value: string): any {

    console.log(value);

    // méthode appelée pour l'update de la liste des logins du champs auto-complete : (ÉVITE APPELS DES DONNÉES DANS LE CONSTRUCTEUR...)
    this.usersService.getUsers()
    .subscribe(data$ => {
      this.data$ = data$
      console.log(this.data$);
      return this.data$
    });
    
    console.log(this.data$);

    // const logins = this.users;
    const datas = this.data$;
    console.log(datas);
    const userData = [];

    for (let i = 0; i < datas.length; i++) {
      userData.push(datas[i].login);
    }

    console.log(userData);
    const filterValue = value.toLowerCase();
    
    return userData.filter(user => user
      .toLowerCase()
      .includes(filterValue));

  }


  private _mailFilter(value: string): User[] {

    // méthode appelée pour l'update de la liste des logins du champs auto-complete :
    this.usersService.getUsers()
    .subscribe(data$ => {
      this.data$ = data$
      console.log(this.data$);
      return this.data$
    });
    
    console.log(this.data$);
    
    const datas = this.data$;
    console.log(datas);

    const mailData = [];

    for (let i = 0; i < datas.length; i++) {
      mailData.push(datas[i].mail);
    }

    console.log(mailData);
    const filterValue = value.toLowerCase();
    
    return mailData.filter(user => user
      .toLowerCase()
      .includes(filterValue));

  }

  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.log('VALUE NAME_SPECIE \'ON SUBMIT _\' DANS UN CHAMPS DE FORMULAIRE : ' + this.inscriptionForm.value.login);
  // }


  // APPEL DES DONNÉES GÉNÉRALES SUR LES UTILISATEURS:
  // private getUsers(): any {
  //   this.usersService.getUsers()
  //     .subscribe(datas => (this.datas = datas));
  // }

  // APPEL DES DONNÉES GÉNÉRALES SUR LES UTILISATEURS:
  private getUsers(): any {
  this.usersService.getUsers()
    .subscribe(user$ => (this.user$ = user$));
  }



  
  ngOnInit() {

    this.getUsers();
    
      // ÉCOUTER LES CHANGEMENTS DANS LES DONNÉES TAPÉES DANS LE CHAMPS (= STRING):
      this.loginFilteredOptions = this.login.valueChanges
      .pipe(
        startWith(''),
        map(value => this._loginFilter(value)),
        debounceTime(300) // --> (en test) applique un "timeout" qui permet la mise à jour de la liste des champs si l'on passe de l'un à l'autre
      );

      this.mailFilteredOptions = this.mail.valueChanges
      .pipe(
        startWith(''),
        map(value => this._mailFilter(value)),
        debounceTime(300)
      );

  }



  // DELETE (AVEC LISTE D'ÉLÉMENTS) - tests
//   delete(login: string): void {
//     console.log(login);
//     // this.users = this.users.filter(u => u !== login); // marche pas
//     // console.log(this.users);
    
//     this.usersService
//       .deleteUser3(login)
//       .subscribe();
//   }


// // DELETE (AVEC BOUTON) :
  onDelete2(user: User): void {
    this.user$ = this.user$.filter(u => u !== user);
    this.usersService
    .deleteUser2(user)
    .subscribe();
  }


  // NECESSAIRE POUR L'UPDATE:
  onEdit(user: User) {

    // si getUsers() = utilisé -> timeout semble nécessaire :
    // setTimeout(() => {
    //   this.getUsers();
    //   console.log('timeout !');
    //   // this.editUser = user;
    // }, 15000);  // 2000 = 2 secondes de délai avant le chargement

    this.editUser = user;
  }


  onUpdate() {

    this.getUsers();

    if (this.editUser) {
       
        this.usersService
          .updateUser(this.editUser) // editUser: User (type)
          .subscribe(user => {
            
            const ix = user ? this.user$.findIndex(u => u.id_user === user.id_user) : -1;
            
            if(ix > -1) {
              this.user$[ix] = user;
            }
          });
          
        // réinitialisation du membre édité:
        this.editUser = undefined;

    }

  }



}
