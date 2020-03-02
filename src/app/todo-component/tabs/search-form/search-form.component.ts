import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartUpdateComponent } from '../../../todo-class/chart-update/chart-update.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Output, EventEmitter } from '@angular/core'; // pour export du composant 'enfant' > 'parent'

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish';

import { LinechartOptionsService } from '../../../todo-class/linechart-options';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})

export class SearchFormComponent<D> implements OnInit {


  // *******

  // pour export du composant 'enfant' > 'parent':

  // @Output() newItemEvent = new EventEmitter<string>(); 
  // @Output() initSpecieEvent = new EventEmitter<String>();

  // addNewItem(value: string) { // test export enfant > parent
  //   this.newItemEvent.emit(value);
  // }

  // *******


  public fishing$: Fish[]; // on pourrait remplacer les suivants par celui-ci ???
  public nameSp$: Fish[]; // ou Object;
  public superZone$: Fish[];
  public zone$: Fish[];
  public date$: Fish[];
  public date2$: Fish[];
  begin: D | null;
  end: D | null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fishService: FishService,
    private linechartOptionsService: LinechartOptionsService
  ) {}



  // ************ METHODE 1 : ******************

  //  On définit ici la valeur des champs (avant l'INIT):

  searchForm = this.fb.group({ // pour ajouter des champs de recherche
    nameSp: this.fb.array([
      this.fb.control('Toutes Espèces')
      //  this.fb.control('', Validators.required),
    ]),
    superZ: this.fb.array([
      this.fb.control('')
    ]),
    zone: this.fb.array([
      this.fb.control('Toutes Zones')
    ]),
    date: this.fb.array([  // POUR UN FORMULAIRE DE DATE SIMPLE
      this.fb.control('')
    ]),
    date2: [{ begin: new Date(2018, 1, 7), end: new Date() }], // pour un 'Satdatepicker' 
  });


  // écoute du contenu des champs (et de leur évolution):

  // pour export de composant 'parent' > 'enfant' (lien avec 'search-form.component.html') :

  currentnameSp; // ancien 'currentItem' : (property)
  currentZone;
  currentDate;
  currentDate2Begin;
  currentDate2End;

  // ************


  get nameSp() {
    this.currentnameSp = this.searchForm.get('nameSp').value[0];
    // console.log(this.searchForm.value.nameSp[0]); // autre écriture possible

    // TEST : export du composant enfant > parent
    // let nameSpEmit = this.searchForm.value.nameSp; 
    // this.initSpecieEvent.emit(nameSpEmit[0]);

    return this.searchForm.get('nameSp') as FormArray;
  }
  get zone() {
    this.currentZone = this.searchForm.get('zone').value[0];
    return this.searchForm.get('zone') as FormArray;
  }
  get date() {
    this.currentDate = this.searchForm.get('date').value;
    return this.searchForm.get('date') as FormArray;
  }
  get date2() {
    this.currentDate2Begin = this.searchForm.get('date2').value.begin;
    this.currentDate2End = this.searchForm.get('date2').value.end;
    return this.searchForm.get('date2') as FormArray;
  }


  ngOnInit() {

  
    //  On définit ici la valeur des champs (à l'INIT):
    this.fishService.getDate()
    .subscribe(fishing$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

      this.fishing$ = fishing$;
      console.log(fishing$[0].date);
      const lastDate = fishing$[0].date;

      this.searchForm = this.fb.group({ // pour ajouter des champs de recherche
        nameSp: this.fb.array([
          this.fb.control('Toutes Espèces')
          //  this.fb.control('', Validators.required),
        ]),
        superZ: this.fb.array([
          this.fb.control('')
        ]),
        zone: this.fb.array([
          this.fb.control('Toutes Zones')
        ]),
        date: this.fb.array([  // POUR UN FORMULAIRE DE DATE SIMPLE
          this.fb.control(lastDate)
        ]),
        date2: [{ begin: new Date(2018, 1, 7), end: new Date() }], // pour un 'Satdatepicker' 
      });

    });


    // console.log(this.currentnameSp);
    // console.log(this.currentZone);
    // console.log(this.currentDate);
    // console.log(this.currentDate2Begin);
    // console.log(this.currentDate2End);

    // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.fishService.getFishes()
      .subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
        this.nameSp$ = nameSp$;
        // console.log(this.nameSp$[0].name_specie);
        
        this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
          id_fishing: 0,
          value_landing: 0,
          value_quota: 0,
          date: null,
          name_specie: 'Toutes Espèces',
          super_zone: 'string',
          zone: 'string',
          z_coord: null, // avant : format = JSON
          sz_coord: null
        });
      });
  
    this.fishService.getZone()
      .subscribe(zone$ => { 
        this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

        this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
          id_fishing: 0,
          value_landing: 0,
          value_quota: 0,
          date: null,
          name_specie: 'string',
          super_zone: 'string',
          zone: 'Toutes Zones',
          z_coord: null,
          sz_coord: null
        });
      });


    this.fishService.getDate()
    .subscribe(date$ => {
      this.date$ = date$;
    });

    this.fishService.getDate2()
      .subscribe(date2$ => {
        this.date2$ = date2$;
    });
  

  } // FIN DE MÉTHODE 'ONINIT()'





  onSelect(): any {

    // console.log(this.currentnameSp);
    // console.log(this.currentZone);
    // console.log(this.currentDate);
    // console.log(this.currentDate2Begin);
    // console.log(this.currentDate2End);


    // LORSQU'ON CHOISIT UN NOM D'ESPÈCE, ON A LA ZONE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :
    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    let nameSpdatas = nameSpSelect$[0];  // value: name_specie (du template)

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
    }


    // LORSQU'ON CHOISIT UNE ZONE, ON A LE NOM D'ESPÈCE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :
    const zoneSelect$ = this.searchForm.get('zone').value;
    let  zonedatas = zoneSelect$[0];  // values: name_specie (du template)

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
    }


    // LORSQU'ON CHOISIT UNE DATES SIMPLE, ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)
    const dateSelect$ = this.searchForm.get('date').value; // date = valeur donnée par le formulaire (html > searchForm)

    // ATTENTION : pour un champs 'select', date = string >> PAS DE TRANSFORMATION
    let dateSelectToString = dateSelect$;

    // ATTENTION : pour un 'Datepicker', date = format 'UTC' >> TRANSFORMATION EN STRING : 'YYYY-MM-DD'
    // let dateSelectToString = dateSelect$.getFullYear() + '-' + Number(dateSelect$.getMonth() + 1) + '-' + dateSelect$.getDate();
    // console.log(dateSelectToString); // MODE D'AFFICHAGE À REVOIR

    // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :
    if (dateSelectToString[0] === null || dateSelectToString === 'Dernière Dates') {
      // console.log(dateSelectToString);
      dateSelectToString = 'vide';
      alert('Veuillez choisir une date simple...');
      return;
    }



    // **********************************************

    // LORSQU'ON CHOISIT UNE PLAGE DE DATES (BEGIN & END), ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)

    const date2Select$ = this.searchForm.get('date2').value; // date2 = valeur donnée par le formulaire (html > searchForm)

    // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :
    if (date2Select$ === null) {
      alert('Veuillez choisir une plage de dates...');
      return;
    }


    let date2BeginDatas = date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-'
    + date2Select$.begin.getDate();

    if (date2BeginDatas === '' || date2BeginDatas === null || date2BeginDatas === 'Date de Début') {
      date2BeginDatas = 'vide';
    }

    let date2EndDatas = date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-'
    + date2Select$.end.getDate();

    if (date2EndDatas === '' || date2EndDatas === null || date2EndDatas === 'Date de Fin') {
      date2EndDatas = 'vide';
    }
    

    this.fishService.getNewDate2(date2BeginDatas, date2EndDatas)
    .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

      this.date2$ = date2$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

    });




    // METHODES CORRESPONDANTES :

    // au nom d'espèce sélectionné, les zones et dates correspondantes sont filtrées : (en test)
    this.fishService.getNewZoneForSingleDate(nameSpdatas, dateSelectToString)
    .subscribe(zone$ => {
      this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

      this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
        id_fishing: 0,
        value_landing: 0,
        value_quota: 0,
        date: undefined,
        name_specie: 'string',
        super_zone: 'string',
        zone: 'Toutes Zones',
        z_coord: null,
        sz_coord: null
      });

    });

    // à la zone sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
    this.fishService.getNewNamespForSingleDate(zonedatas, dateSelectToString)
    .subscribe(nameSp$ => {

      this.nameSp$ = nameSp$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

      this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
        id_fishing: 0,
        value_landing: 0,
        value_quota: 0,
        date: null,
        name_specie: 'Toutes Espèces',
        super_zone: 'string',
        zone: 'string',
        z_coord: null,
        sz_coord: null
      });
    });

    // à la date sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
    this.fishService.getNewDateForSingleDate(nameSpdatas, zonedatas)
    .subscribe(date$ => {
      this.date$ = date$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
    });

  } // FIN DE ONSELECT()




  

  onReset(): any {

    // console.log(this.currentnameSp);
    // console.log(this.currentZone);
    // console.log(this.currentDate);
    // console.log(this.currentDate2Begin);
    // console.log(this.currentDate2End);



    // *********************************************************************************** //

    //  ACTUALISATION DES REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE     //

    // *********************************************************************************** //

    // indiquer ici la route vers l'api choisie : getFishes()...
    this.fishService.getFishes()
      .subscribe(nameSp$ => {
        this.nameSp$ = nameSp$;

        this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
          id_fishing: 0,
          value_landing: 0,
          value_quota: 0,
          date: null,
          name_specie: 'Toutes Espèces',
          super_zone: 'string',
          zone: 'string',
          z_coord: null,
          sz_coord: null
        });  
      });    

      this.fishService.getSuperZone()
        .subscribe(superZone$ => {
        this.superZone$ = superZone$;
        });
      
      this.fishService.getZone()
        .subscribe(zone$ => {
          this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
      
          this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
            id_fishing: 0,
            value_landing: 0,
            value_quota: 0,
            date: null,
            name_specie: 'string',
            super_zone: 'string',
            zone: 'Toutes Zones',
            z_coord: null,
            sz_coord: null
          });
        });


      this.fishService.getDate()
      .subscribe(date$ => {
        this.date$ = date$;
      });

      this.fishService.getDate2()
        .subscribe(date2$ => {
          this.date2$ = date2$;
        });
    

      // ACTUALISATION DU FORMULAIRE DE BASE :
      
    //  On redéfinit ici la valeur des champs (au RESET):
    this.fishService.getDate()
      .subscribe(fishing$ => {

      this.fishing$ = fishing$;

      const lastDate = fishing$[0].date;

      this.searchForm = this.fb.group({ // pour ajouter des champs de recherche
        nameSp: this.fb.array([
          this.fb.control('Toutes Espèces')
          //  this.fb.control('', Validators.required),
        ]),
        superZ: this.fb.array([
          this.fb.control('')
        ]),
        zone: this.fb.array([
          this.fb.control('Toutes Zones')
        ]),
        date: this.fb.array([  // POUR UN FORMULAIRE DE DATE SIMPLE
          this.fb.control(lastDate)
        ]),
        date2: [{ begin: new Date(2018, 1, 7), end: new Date() }], // 2018, 1, 7 / 2018, 9, 31 ou new date() // pour un 'Satdatepicker' 
      });

    });
    
  } // FIN DE MÉTHODE 'ONRESET()'



}
