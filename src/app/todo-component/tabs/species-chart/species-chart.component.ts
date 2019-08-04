import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartUpdateComponent } from '../../../todo-class/chart-update/chart-update.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish';

import { BarchartOptionsService } from '../../../todo-class/barchart-options';

import * as _moment from 'moment';
const moment = _moment;


@Component({
  selector: 'app-species-chart',
  templateUrl: './species-chart.component.html',
  styleUrls: ['./species-chart.component.scss'],
  providers: [
    FishService
  ]
})

export class SpeciesChartComponent<D> implements OnInit {
  @ViewChild(ChartUpdateComponent) chartComponent: ChartUpdateComponent;

  public fishing$: Fish[];
  public nameSp$: Fish[]; // ou Object;
  public superZone$: Fish[];
  public zone$: Fish[];
  public date$: Fish[];
  // public date2$: Fish[];
  begin: D | any;
  end: D | null;
  // searchForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fishService: FishService,
    private barchartOptionsService: BarchartOptionsService
  ) {}


  // ************ METHODE 1 : ******************

  searchForm = this.fb.group({ // pour ajouter des champs de recherche
      nameSp: this.fb.array([
        this.fb.control('Toutes Espèces'),
        //  this.fb.control('', Validators.required),

      ]),
      superZ: this.fb.array([
        this.fb.control('Toutes Super Zones')
      ]),
      zone: this.fb.array([
        this.fb.control('Toutes Zones')
      ]),
      date: this.fb.array([
        this.fb.control(new Date().toISOString().slice(0, 10)) // DATE DU JOUR POUR NGONINIT
        // console.log(new Date().toISOString().slice(0, 10))
        // this.fb.control('2019-02-21') // TEST AVEC UNE DATE STRING POUR NGONINIT
      ])

      // date: new FormControl(new Date(2018, 1, 7)), // DATE DE TYPE GMT pour un sat ou mat-date-picker
      // date2: [{ begin: new Date(), end: new Date() }] // 2018, 1, 7 / 2018, 9, 31 (pour un sat-date-picker,
      // permettant des plages de dates)
    });



  //  MyControl = new FormControl();
//  filteredOptions: Observable<String[]>;
  //  nameSp: string[] = ['One', 'Two', 'Three'];

// ***************

/*
get fishings() {
  return this.searchForm.get('fishings') as FormArray;
}
*/

// ******************

  get nameSp() {
  //  console.log(this.searchForm.get('nameSp') as FormArray);
  //  return this.searchForm.value;
    return this.searchForm.get('nameSp') as FormArray;
  }
  get superZ() {
    return this.searchForm.get('superZ') as FormArray;
  }
  get zone() {
    return this.searchForm.get('zone') as FormArray;
  }
  get date() {
    return this.searchForm.get('date') as FormArray;
  }
  // get date2() {
  //   return this.searchForm.get('date2') as FormArray;
  // }


// MODÈLE du graphique :
  type = 'bar';
  data: any;
  options = this.barchartOptionsService.options;



ngOnInit(): any {


// ENVOI DES DONNÉES DE L'API AUX SELECT-LISTES DU FORMULAIRE DE RECHERCHE :

  this.fishService.getFishes()
    .subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.nameSp$ = nameSp$;
      this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
        id_fishing: 0,
        value_landing: 0,
        value_quota: 0,
        date: null,
        name_specie: 'Toutes Espèces',
        super_zone: 'string',
        zone: 'string',
        z_coord: JSON,
        sz_coord: JSON
      });
    }
  );

  this.fishService.getSuperZone()
    .subscribe(superZone$ => {    // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.superZone$ = superZone$;
    }
  );

  this.fishService.getZone()
    .subscribe(zone$ => {   // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.zone$ = zone$;   // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
      this.zone$.unshift({  // AJOUT d'un choix "toutes zones" au début de la liste 'select'
        id_fishing: 0,
        value_landing: 0,
        value_quota: 0,
        date: null,
        name_specie: 'string',
        super_zone: 'string',
        zone: 'Toutes Zones',
        z_coord: JSON,
        sz_coord: JSON
      });
    }
  );


  this.fishService.getDate()
    .subscribe(date$ => {
      // indiquer ici la route vers l'api choisie dans 'fish.service' : getSomeFishes()...
      this.date$ = date$;
      // console.log(this.date$);
    }
  );

  // this.fishService.getDate2()
  //   .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
  //     this.date2$ = date2$;
  //   // console.log(this.date2$);
  //   });

/*
    // TEST LISTE DE PECHES :
    this.fishService.getAllFishings().subscribe(
      fishing$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.fishing$ = fishing$;
      }
    );
*/
  //  this.fishService.getAllFishings();


  // ************************************************************************************** //

// *******************    AFFICHAGE DU GRAPHIQUE GÉNÉRIQUE           ******************** //

// ************************************************************************************** //



// let dateAsString = this.searchForm.value.date[0]; // cas d'un champs select date
// console.log(dateAsString);

// if (dateAsString === '') {
//   // modification de l'UTC date pour les 'labels' du graphique :
//   dateAsString = 'vide';
//   // dateLabelToString = 'Toutes Dates';
// }



  this.fishService.getAllFishingSpecies()
  // this.fishService.getAllFishingSpecies(dateToString)
    .subscribe(fishes => {

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
      const date = fishes[0].date;
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      console.log(parsedDate);

      // this.type = 'bar';
      this.data = {
        labels: [],
        datasets: [
          { // valeurs de date (API) : fishes[0].date (problème apparence)
            label: ['Captures (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date

            // label: ['Captures (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            data: [],
            backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
            borderColor: '#ff4500' // backgroundColor: '#FF6384'
          },
          {
            label: ['Quotas (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Quotas (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            data: [],
            backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
            borderColor: '#2d9ab7'
          }
        ]
      };

      if (Object(fishes).length > 0) {

        // alert('De nouvelles données sont arrivées...');

        for (let i = 0; i < Object(fishes).length; i++) {
    //    for (let i = 0; i < Object.keys(fishes).length; i++) {

          const landingdatas = fishes[i].value_landing;  // values: value_landing
          this.data.datasets[0].data.push(landingdatas);

          const quotadatas = fishes[i].value_quota;  // values: value_quota
          this.data.datasets[1].data.push(quotadatas);

          const speciesdatas = fishes[i].name_specie;  // values : date;
          this.data.labels.push(speciesdatas);

        } // fin de boucle 'for'

      } else {
        alert('Pas de donnée...');
        // alert('Pas de nouvelle donnée pour aujourd\'hui...');
      }

    }
  );

}











// *********************************************************************************** //

// *****      REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// *********************************************************************************** //


  onSelect(): any {

  /* ********************************************************************************************* */

  // LORSQU'ON CHOISIT UN NOM D'ESPÈCE, ON A LA ZONE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    // console.log(nameSpSelect$);
    // console.log(nameSpSelect$[0]);
    let  nameSpdatas = nameSpSelect$[0];  // values: name_specie (du template)

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
    }

/* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE ZONE, ON A LE NOM D'ESPÈCE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    const zoneSelect$ = this.searchForm.get('zone').value;
    // console.log(zoneSelect$);
    // console.log(zoneSelect$[0]);
    let  zonedatas = zoneSelect$[0];  // values: name_specie (du template)

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
    }


/* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE DATES SIMPLE, ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)

    const dateSelect$ = this.searchForm.get('date').value; // date = valeur donnée par le formulaire (html > searchForm)
    // console.log(dateSelect$);
    // console.log(date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-' + date2Select$.begin.getDate());
    // console.log(date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-' + date2Select$.end.getDate());

    // console.log(date2Select$[0]);
    // let  date2Datas = date2Select$[0];  // values: name_specie (du template)

    //  let dateDatas = dateSelect$;

    // ATTENTION : pour un champs select, date = string >> PAS DE TRANSFORMATION
    let dateSelectToString = dateSelect$;

    // pour un datepicker, date = format UTC >> TRANSFORMATION EN STRING : 'YYYY-MM-DD'
    // let dateSelectToString = dateSelect$.getFullYear() + '-' + Number(dateSelect$.getMonth() + 1) + '-' + dateSelect$.getDate();
    // console.log(dateSelectToString); // MODE D'AFFICHAGE À REVOIR

    // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :
    if (dateSelectToString[0] === null || dateSelectToString === 'Toutes Dates') {
      // console.log(dateSelectToString);
      dateSelectToString = 'vide';
      alert('Veuillez choisir une date...');
      return;
    }

// *************************************************

    // const date2Datas = date2Select$; // pour gestion d'erreur date$ = null (à la base) > inutile, sauf pour champs Date SIMPLE ??
    // console.log(date2Datas);

    // let date2BeginDatas = date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-'
    // + date2Select$.begin.getDate();

    // if (date2BeginDatas === '' || date2BeginDatas === null || date2BeginDatas === 'Toutes Zones') {
    //   date2BeginDatas = 'vide';
    // }


    // let date2EndDatas = date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-'
    // + date2Select$.end.getDate();

    // if (date2EndDatas === '' || date2EndDatas === null || date2EndDatas === 'Toutes Zones') {
    //   date2EndDatas = 'vide';
    // }


// ****************************************************************************

// METHODES CORRESPONDANTES :

// au nom d'espèce sélectionné, les zones et dates correspondantes sont filtrées : (en test)

// this.fishService.getNewNameSp(nameSpdatas, date2Datas)
this.fishService.getNewZoneForSingleDate(nameSpdatas, dateSelectToString)
.subscribe(zone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

  this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

  this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
    id_fishing: 0,
    value_landing: 0,
    value_quota: 0,
    date: undefined,
    name_specie: 'Toutes Espèces',
    super_zone: 'Toutes Super-Zones',
    zone: 'Toutes Zones',
    z_coord: JSON,
    sz_coord: JSON
  });

});

// ****************************************************************************

// à la zone sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
this.fishService.getNewNamespForSingleDate(zonedatas, dateSelectToString)
.subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

  this.nameSp$ = nameSp$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

  this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
    id_fishing: 0,
    value_landing: 0,
    value_quota: 0,
    date: null,
    name_specie: 'Toutes Espèces',
    super_zone: 'Toutes Super-Zones',
    zone: 'Toutes Zones',
    z_coord: JSON,
    sz_coord: JSON
  });

});

// ****************************************************************************

// à la date sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
this.fishService.getNewDateForSingleDate(nameSpdatas, zonedatas)
.subscribe(date$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

  this.date$ = date$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

  // this.date$.unshift({ // AJOUT d'un choix "toutes dates" au début de la liste 'select'
  // // PROBLÈME : UNE DATE N'EST PAS UNE STRING >> PAS POSSIBLE COMME ÇA ! ???
  //   id_fishing: 0,
  //   value_landing: 0,
  //   value_quota: 0,
  //   date: null,
  //   name_specie: 'Toutes Espèces',
  //   super_zone: 'Toutes Super-Zones',
  //   zone: 'Toutes Zones'
  // });

});


// ****************************************************************************

/*
    this.fishService.getNewDate2(date2BeginDatas, date2EndDatas)
      .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
        this.date2$ = date2$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
    });
*/

  } // FIN DE MÉTHODE 'ONSELECT'












  onReset(): any {


  // ACTUALISATION DU FORMULAIRE DE BASE :

  this.searchForm = this.fb.group({
    nameSp: this.fb.array([
      this.fb.control('Toutes Espèces'),
    ]),
    superZ: this.fb.array([
      this.fb.control('')
    ]),
    zone: this.fb.array([
      this.fb.control('Toutes Zones')
    ]),
    date: this.fb.array([
      this.fb.control(new Date().toISOString().slice(0, 10)) // DATE DU JOUR POUR NGONINIT
      // this.fb.control('2018-1-7') // TEST AVEC UNE DATE 'STRING' POUR NGONINIT
    ])
    // date: new FormControl(new Date(2018, 1, 7)) // DONNE UNE DATE DE TYPE 'GMT' // POUR UN MAT OU SAT-DATE-PICKER
    // date2: [{ begin: new Date(2018, 1, 7), end: new Date() }] // POUR UN SAT-DATE-PICKER (PLAGE DE DATES)
  });


  // *********************************************************************************** //

  //  ACTUALISATION DES REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE     //

  // *********************************************************************************** //


  this.fishService.getFishes()
  .subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.nameSp$ = nameSp$;

    this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
      id_fishing: 0,
      value_landing: 0,
      value_quota: 0,
      date: null,
      name_specie: 'Toutes Espèces',
      super_zone: 'string',
      zone: 'string',
      z_coord: JSON,
      sz_coord: JSON
    });
  }
  );

  this.fishService.getSuperZone()
  .subscribe(superZone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.superZone$ = superZone$;
  }
  );

  this.fishService.getZone()
  .subscribe(zone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

    this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
      id_fishing: 0,
      value_landing: 0,
      value_quota: 0,
      date: null,
      name_specie: 'string',
      super_zone: 'string',
      zone: 'Toutes Zones',
      z_coord: JSON,
      sz_coord: JSON
    });
  }
  );


  // MODIF #############################

  this.fishService.getDate()
  .subscribe(date$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.date$ = date$;
  // console.log(this.date$);
  }
  );

// #####################################


  // ******************


  // const date$ = this.searchForm.get('date').value;

  const dateToString = this.searchForm.value.date; // cas d'un champs select date
  // console.log(dateToString);

  // const dateLabelToString = dateToString;

  // if (dateToString === '' || dateToString === 'Toutes dates') {
  //   // modification de l'UTC date pour les 'labels' du graphique :
  //   dateToString = 'vide';
  //   // dateLabelToString = 'Toutes Dates';
  // }

  // ACTUALISATION DU GRAPHIQUE DE BASE :

  this.fishService.getAllFishingSpecies() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
  // this.fishService.getAllFishingSpecies(dateToString) //  indiquer ici la route vers l'api choisie : getSomeFishes()...
    .subscribe(fishes => {

      //  this.fishes = fishes;
      //  console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
      const date = fishes[0].date;
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      // console.log(parsedDate);

      // this.type = 'bar';
      this.data = {
        labels: [],
        datasets: [
          {
            label: ['Captures (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Captures (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            data: [],
            backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
            borderColor: '#ff4500' // backgroundColor: '#FF6384'
          },
          {
            label: ['Quotas (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Quotas (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            data: [],
            backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
            borderColor: '#2d9ab7'
          }
        ]
      };

      // this.data.datasets[0].label.push(nameSpdatas);
      // this.data.datasets[1].label.push(nameSpdatas);

      // this.data.datasets[0].label.push(zonedatas);
      // this.data.datasets[1].label.push(zonedatas);

      if (Object(fishes).length > 0) {

        for (let i = 0; i < Object(fishes).length; i++) {
        //  for (let i = 0; i < Object.keys(fishs).length; i++) {

          const landingPushDatas = fishes[i].value_landing;  // values: value_landing
          this.data.datasets[0].data.push(landingPushDatas);

          const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
          this.data.datasets[1].data.push(quotaPushDatas);

          const speciesdatas = fishes[i].name_specie;  // values : date;
          this.data.labels.push(speciesdatas);

        } // fin de boucle 'for'

      } else {
        alert('Pas de donnée...');
        // alert('Pas de nouvelle donnée pour aujourd\'hui...');
      }

    });

  }












  onSpeciesLabels(): any {

    // const superZSelect$ = this.searchForm.get('superZ').value;

    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    let  nameSpdatas = nameSpSelect$[0];  // values: name_specie (du template)
    let labelnameSp = nameSpdatas;

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
      labelnameSp = 'Toutes Espèces';
    }

    const zoneSelect$ = this.searchForm.get('zone').value;
    // gestion d'une 'ZONE' VIDE :
    let zonedatas = zoneSelect$[0];
    let labelzone = zonedatas;

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
      labelzone = 'Toutes Zones';
    }

    const dateSelect$ = this.searchForm.get('date').value;

    // VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string')
    const dateAString = dateSelect$[0]; // cas d'un champs select date
    //  const dateLabelToString = date$;


    // POUR UNE DATE AU FORMAT GMT :
    // let dateToString = date$.getFullYear() + '-' + Number(date$.getMonth() + 1) + '-' + date$.getDate();
    // console.log(dateToString);
    // console.log(dateToString); // MODE D'AFFICHAGE À REVOIR

    // VARIABLE POUR UN MAT-OU SAT-DATEPICKER A DATE UNIQUE : (DATE AU FORMAT GMT)
    // const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'
    // console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$)); // date transformée  à partir du format UTC
    // const dateLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$); // cas d'un mat ou sat datepicker

    // GESTION ERREUR CHAMPS DATE 'NULL' :
    // console.log(dateAString);
    // if (dateAString === '' || dateAString === undefined) {
    //   // modification de l'UTC date pour les 'labels' du graphique :
    //   dateAString = 'vide';
    //   alert('Veuillez choisir une date...');
    // }
    // /********************************** */


    this.fishService.getAllSpecies(nameSpdatas, zonedatas, dateAString)
//    this.httpService.get('./api/AllSpeciesAtZone', {responseType: 'json'})
    .subscribe(
      fishes => {

        // GESTION D'ERREUR (CHAMPS DATE NON COMPLÉTÉ)
        // console.log(fishes[0]);
        const datedatas = fishes[0];

        if (datedatas === undefined) {
          alert('Veuillez choisir une date.');
          return;
        }

        // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
        const date = fishes[0].date;
        const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
        // console.log(parsedDate);


        // this.type = 'bar';
        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (le ' + parsedDate + ') - ' + labelnameSp, ' ' + labelzone],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500' // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (le ' + parsedDate + ') - ' + labelnameSp, ' ' + labelzone],
              data: [],
              backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
              borderColor: '#2d9ab7'
            }
          ]
        };

        if (Object(fishes).length > 0) {

          for (let i = 0; i < Object(fishes).length; i++) {
      //    for (let i = 0; i < Object.keys(fishes).length; i++) {

            const landingdatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingdatas);

            const quotadatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotadatas);

            const speciesdatas = fishes[i].name_specie;  // values : date;
            this.data.labels.push(speciesdatas);

          } // fin de boucle 'for'

        }  else {
          alert('Pas de donnée...');
        }

      }
    );

  } // fin boucle 'onSpeciesLabels'()'


} // fin de classe 'ChartChangeComponent'
