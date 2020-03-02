import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  // @ViewChild(ChartUpdateComponent) chartComponent: ChartUpdateComponent; // ########### enlevé après MAJ !! (à tester...)

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



  // Import du Composant 'parent' > 'enfant' :
  @Input() nameSpecieSelect: string; // ancien 'item'
  @Input() zoneSelect: string;
  @Input() dateSelect: Date;
  @Input() date2BeginSelect: Date;
  @Input() date2EndSelect: Date;




  
  // MODÈLE du graphique :
  type = 'bar';
  data: any;
  options = this.barchartOptionsService.options;



  ngOnInit(): any {

    console.log(this.nameSpecieSelect);
    console.log(this.zoneSelect);
    console.log(this.dateSelect);
    console.log(this.date2BeginSelect);
    console.log(this.date2EndSelect);

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

    console.log(this.nameSpecieSelect);
    console.log(this.zoneSelect);
    console.log(this.dateSelect);
    console.log(this.date2BeginSelect);
    console.log(this.date2EndSelect);

  } // FIN DE MÉTHODE 'ONSELECT'





  onReset(): any {

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

    console.log(this.nameSpecieSelect);
    console.log(this.zoneSelect);
    console.log(this.dateSelect);
    console.log(this.date2BeginSelect);
    console.log(this.date2EndSelect);

    // const superZSelect$ = this.searchForm.get('superZ').value;

    const nameSpSelect$ = this.nameSpecieSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    // const nameSpSelect$ = this.searchForm.get('nameSp').value;

    let  nameSpdatas = nameSpSelect$;  // values: name_specie (du template)
    let labelnameSp = nameSpdatas;

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
      labelnameSp = 'Toutes Espèces';
    }

    const zoneSelect$ = this.zoneSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    // const zoneSelect$ = this.searchForm.get('zone').value;
    // gestion d'une 'ZONE' VIDE :
    let zonedatas = zoneSelect$;
    let labelzone = zonedatas;

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
      labelzone = 'Toutes Zones';
    }

    const dateSelect$ = this.dateSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    // const dateSelect$ = this.searchForm.get('date').value;

    // VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string')
    let dateAString = dateSelect$.toString(); // cas d'un champs select date
    //  const dateLabelToString = date$;


    // POUR UNE DATE AU FORMAT GMT :
    // let dateToString = date$.getFullYear() + '-' + Number(date$.getMonth() + 1) + '-' + date$.getDate();
    // console.log(dateToString); // MODE D'AFFICHAGE À REVOIR

    // VARIABLE POUR UN MAT-OU SAT-DATEPICKER A DATE UNIQUE : (DATE AU FORMAT GMT)
    // const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'
    // console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$)); // date transformée  à partir du format UTC
    // const dateLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$); // cas d'un mat ou sat datepicker

    // GESTION ERREUR CHAMPS DATE 'NULL' :
    console.log(dateAString);
    if (dateAString === '' || dateAString === undefined) {
      // modification de l'UTC date pour les 'labels' du graphique :
      dateAString = 'vide';
      alert('Veuillez choisir une date...');
    }
    // /********************************** */


    this.fishService.getAllSpecies(nameSpdatas, zonedatas, dateAString)
//    this.httpService.get('./api/AllSpeciesAtZone', {responseType: 'json'})
    .subscribe(
      fishes => {

        // GESTION D'ERREUR (CHAMPS DATE NON COMPLÉTÉ)
        // console.log(fishes[0]);
        const datedatas = fishes[0];
        // const datedatas = fishes[0].date;
        console.log(datedatas);
        
        if (datedatas === undefined) {
          console.log('datedatas :' + datedatas);
          alert('Veuillez choisir une date...');
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

            const  quotadatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotadatas);

            const speciesdatas = fishes[i].name_specie;  // values : date;
            this.data.labels.push(speciesdatas);

          }

        }  else {
          alert('Pas de donnée...');
        }

      }
    );

  } // fin boucle 'onSpeciesLabels'()'


} // fin de classe 'ChartChangeComponent'
