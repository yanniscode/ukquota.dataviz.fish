import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../shared/todo-class/fish';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})


export class SearchFormComponent implements OnChanges, OnInit, OnDestroy {

  
  private fishing$: Fish[];

  private nameSp$: Fish[]; // *** Note: ou bien, type = Object;
  private zone$: Fish[];
  private date$: Fish[];
  private date2$: Fish[];

  private searchForm: FormGroup 
  = this.fb.group({ // *** Note: pour créer des champs de recherche (reactive-form)
    nameSp: this.fb.array([
      this.fb.control('')
    ]),
    superZ: this.fb.array([
      this.fb.control('')
    ]),
    zone: this.fb.array([
      this.fb.control('')
    ]),
    date: this.fb.array([  // *** Note: pour un formulaire de date 'simple'
      this.fb.control('')
    ]),
    date2: { }, // *** Note: pour un 'Satdatepicker' (permettant de surligner la plage de date sélectionnée, à la différence du 'MatDatePicker' -> à revoir si évolution de la librairie... ??)
  });


  // *** Ecoute du contenu des champs (et de leur évolution):

  // *** Variables pour export de composant 'parent' > 'enfant' (lien avec 'dates-chart-component', etc...) :
  private currentnameSp: string = '';
  private currentZone: string = '';
  private currentDate: string = '';
  private currentDate2Begin: Date = null;
  private currentDate2End: Date = null;

  public constructor(
    private fb: FormBuilder,
    private fishService: FishService,
  ) {  

    const fishFormFieldsSubscription: Subscription = this.fishService.getDate()
      .subscribe(fishing$ => { 
        // *** Note: indiquer ici la route vers l'api choisie : getSomeFishes()...

      this.fishing$ = fishing$;
      
      const lastDate: string = fishing$[0].date;  
    
      this.currentDate = lastDate;  // *** Note: appel de la dernière date des listes 'select'

      this.currentnameSp = this.searchForm.get('nameSp').value[0];
      this.currentZone = this.searchForm.get('zone').value[0];
      this.currentDate2Begin = this.searchForm.get('date2').value.begin;
      this.currentDate2End = this.searchForm.get('date2').value.end;

      }
    );


    const fishNameDataSubscription: Subscription = this.fishService.getFishes() // indiquer ici la route vers l'api choisie : méthodes = getSomeFishes()...
      .subscribe(nameSp$ => { 
        this.nameSp$ = nameSp$; // *** Note: appel de la liste des éléments du champs 'select'
        
        this.nameSp$.unshift({ // *** Note: ajout d'un choix "toutes espèces" au début de la liste 'select'
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
      }
    );

    const fishZoneDataSubscription: Subscription = this.fishService.getZone()
      .subscribe(zone$ => { 
        this.zone$ = zone$;

        this.zone$.unshift({
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
      }
    );


    const fishDateDataSubscription: Subscription = this.fishService.getDate()
      .subscribe(date$ => {
        this.date$ = date$;
      }
    );


    const fishDate2DataSubscription: Subscription = this.fishService.getDate2()
      .subscribe(date2$ => {
        this.date2$ = date2$;
      }
    );


    setTimeout(() => {
      fishFormFieldsSubscription.unsubscribe();
      fishNameDataSubscription.unsubscribe();
      fishZoneDataSubscription.unsubscribe();
      fishDateDataSubscription.unsubscribe();
      fishDate2DataSubscription.unsubscribe();

    }, 10000);

    clearTimeout(); // utile ??
  }




  public get nameSp(): FormArray {
    return this.searchForm.get('nameSp') as FormArray;
  }

  public get zone(): FormArray {
    return this.searchForm.get('zone') as FormArray;
  }

  public get date(): FormArray {
    return this.searchForm.get('date') as FormArray;
  }

  public get date2(): FormArray {

    this.currentDate2Begin = this.searchForm.get('date2').value.begin;
    this.currentDate2End = this.searchForm.get('date2').value.end;
  
    return this.searchForm.get('date2') as FormArray;
  }




  public ngOnInit(): void {

    // *** Note: On définit ici la valeur des champs (à l'INIT):
   
    const fishFormFieldsSubscription: Subscription = this.fishService.getDate()
      .subscribe(fishing$ => { 

      this.fishing$ = fishing$;

      const lastDate: string = fishing$[0].date;

      this.searchForm = this.fb.group({
        nameSp: this.fb.array([
          this.fb.control('Toutes Espèces')
        ]),
        superZ: this.fb.array([
          this.fb.control('')
        ]),
        zone: this.fb.array([
          this.fb.control('Toutes Zones')
        ]),
        date: this.fb.array([
          this.fb.control(lastDate)
        ]),
        date2: { begin: new Date(2018, 1, 7), end: new Date() },
      });

      }
    );

    setTimeout(() => {
      fishFormFieldsSubscription.unsubscribe();
    }, 10000);

    clearTimeout();

  } // *** Note: fin de méthode 'ngOnInit()'



  public ngOnChanges(): void {
    // console.log('search-form: ngOnChange !');


    // *** Note: LORSQU'ON CHOISIT UN NOM D'ESPÈCE, ON A LA ZONE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :    
    this.currentnameSp = this.searchForm.get('nameSp').value[0];  // valeur du champs nameSp

    let nameSpdatas: string = this.currentnameSp;

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
    }


    // *** Note: LORSQU'ON CHOISIT UNE ZONE, ON A LE NOM D'ESPÈCE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    this.currentZone = this.searchForm.get('zone').value[0];

    let zonedatas: string = this.currentZone;

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
    }


    // *** Note: LORSQU'ON CHOISIT UNE DATES SIMPLE, ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)
    this.currentDate = this.searchForm.get('date').value[0]; 

    let dateDatas: string = this.currentDate;

    // *** gestion d'erreur (mais normalement, aucun champs vide...):
    if (this.currentDate === null) {
      alert('Veuillez choisir une date simple...');
      return;
    }



    // LORSQU'ON CHOISIT UNE PLAGE DE DATES (BEGIN & END), ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)

    this.currentDate2Begin = this.searchForm.get('date2').value.begin;  
    this.currentDate2End = this.searchForm.get('date2').value.end;

    let date2BeginDatas: string = this.currentDate2Begin.getFullYear() + '-' + Number(this.currentDate2Begin.getMonth() + 1) +'-'+ this.currentDate2Begin.getDate();

    let date2EndDatas: string = this.currentDate2End.getFullYear() +'-'+ Number(this.currentDate2End.getMonth() + 1) +'-'+ this.currentDate2End.getDate();


    if (date2BeginDatas === '' || date2BeginDatas === null || date2BeginDatas === 'Date de Début') {
      date2BeginDatas = 'vide';
    }

    if (date2EndDatas === '' || date2EndDatas === null || date2EndDatas === 'Date de Fin') {
      date2EndDatas = 'vide';
    }
    

    // *** Note: gestion d'erreur (plage de dates) :
    if (this.currentDate2Begin === null || this.currentDate2End === null) {
      alert('Veuillez choisir une plage de dates...');

      return;
    }


    // *** Notes: METHODES CORRESPONDANTES :

    const fishNewDate2DataSubscription: Subscription = this.fishService.getNewDate2(date2BeginDatas, date2EndDatas)
      .subscribe(date2$ => { 
        this.date2$ = date2$;
      }
    );

    setTimeout(() => {
      fishNewDate2DataSubscription.unsubscribe();
    }, 10000);
    
    clearTimeout();


    // *** Note: Au nom d'espèce sélectionné, les zones et dates correspondantes sont filtrées :
    const fishNewZoneDataSubscription: Subscription = this.fishService.getNewZoneForSingleDate(nameSpdatas, dateDatas)
      .subscribe(zone$ => {

      this.zone$ = zone$;

      this.zone$.unshift({ // *** Note: AJOUT d'un choix "toutes zones" au début de la liste 'select'
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

      }
    );
    setTimeout(() => {
      fishNewZoneDataSubscription.unsubscribe();
    }, 10000);

    // *** Note: à la zone sélectionnée, les noms d'espèces et dates correspondantes sont filtrées :
    const fishNewNameDataSubscription: Subscription = this.fishService.getNewNamespForSingleDate(zonedatas, dateDatas)
      .subscribe(nameSp$ => {

        this.nameSp$ = nameSp$;

        this.nameSp$.unshift({
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

      }
    );
    setTimeout(() => {
      fishNewNameDataSubscription.unsubscribe();
    }, 10000);

    clearTimeout();


    // *** A la date sélectionnée, les noms d'espèces et dates correspondantes sont filtrées :
    const fishNewDateDataSubscription: Subscription = this.fishService.getNewDateForSingleDate(nameSpdatas, zonedatas)
      .subscribe(date$ => {
        this.date$ = date$; // *** liste des éléments du champs 'select'
      }
    );

    setTimeout(() => {
      fishNewDateDataSubscription.unsubscribe();
    }, 10000);

    clearTimeout();


  } // *** FIN DE ngOnChanges()




  public ngOnDestroy(): void {

    // *** Note: ACTUALISATION DES REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE :
    const fishSelectNamesDataSubscription: Subscription = this.fishService.getFishes()
      .subscribe(nameSp$ => {
        this.nameSp$ = nameSp$;

        this.nameSp$.unshift({
          id_fishing: 0,
          value_landing: 0,
          value_quota: 0,
          date: null,
          name_specie: 'Toutes Espèces',
          super_zone: 'string',
          zone: 'string',
          z_coord: null,
          sz_coord: null
        }
      );

      }
    );
    
    setTimeout(() => {
      fishSelectNamesDataSubscription.unsubscribe();
    }, 10000); 

    clearTimeout();


    const fishSelectZonesDataSubscription: Subscription = this.fishService.getZone()
      .subscribe(zone$ => {

        this.zone$ = zone$; // *** LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
    
        this.zone$.unshift({ // *** AJOUT d'un choix "toutes zones" au début de la liste 'select'
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

      }
    );

    setTimeout(() => {
      fishSelectZonesDataSubscription.unsubscribe();
    }, 10000);

    clearTimeout();


    const fishSelectDatesDataSubscription: Subscription = this.fishService.getDate()
      .subscribe(date$ => {
        this.date$ = date$;
      }
    );

    setTimeout(() => {
      fishSelectDatesDataSubscription.unsubscribe();
    }, 10000);

    clearTimeout();


    const fishSelectDates2DataSubscription: Subscription = this.fishService.getDate2()
      .subscribe(date2$ => {
        this.date2$ = date2$;
      }
    );

    setTimeout(() => {
      fishSelectDates2DataSubscription.unsubscribe();
    }, 10000);

    clearTimeout();


    // *** ACTUALISATION DU FORMULAIRE DE BASE :
      
    // *** On redéfinit ici la valeur des champs (au 'reset'):
    const fishSelectResetDataSubscription: Subscription = this.fishService.getDate()
      .subscribe(fishing$ => {

        this.fishing$ = fishing$;
        const lastDate: string = fishing$[0].date;

        this.searchForm = this.fb.group({
          nameSp: this.fb.array([
            this.fb.control('Toutes Espèces')
          ]),
          superZ: this.fb.array([
            this.fb.control('')
          ]),
          zone: this.fb.array([
            this.fb.control('Toutes Zones')
          ]),
          date: this.fb.array([
            this.fb.control(lastDate)
          ]),
          date2: { begin: new Date(2018, 1, 7), end: new Date() },
        });    

        this.currentDate = this.searchForm.get('date').value;
        this.currentnameSp = this.searchForm.get('nameSp').value[0];
        this.currentZone = this.searchForm.get('zone').value[0];
        this.currentDate2Begin = this.searchForm.get('date2').value.begin;
        this.currentDate2End = this.searchForm.get('date2').value.end;

      }
    );

    setTimeout(() => {
      fishSelectResetDataSubscription.unsubscribe();
    }, 10000);

    clearTimeout(); // utile ??

    
  } // *** FIN DE MÉTHODE 'ngOnDestroy()'



}
