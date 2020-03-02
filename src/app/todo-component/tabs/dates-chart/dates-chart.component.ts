import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartUpdateComponent } from '../../../todo-class/chart-update/chart-update.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// import Chart from 'chart.js';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
const moment = _moment;

import { LinechartOptionsService } from '../../../todo-class/linechart-options';

@Component({
  selector: 'app-dates-chart',
  templateUrl: './dates-chart.component.html',
  styleUrls: ['./dates-chart.component.scss'],
  providers: [
    FishService
  ]
})


export class DatesChartComponent<D> implements OnInit {

  // @ViewChild(ChartUpdateComponent) chartUpdateComponent: ChartUpdateComponent; // enlevé après MAJ !! (à tester...)

  public fishing$: Fish[];
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
    private linechartOptionsService: LinechartOptionsService,
    ) {}

  // Import du Composant 'parent' > 'enfant' :
  @Input() nameSpecieSelect: string; // ancien 'item'
  @Input() zoneSelect: string;
  @Input() dateSelect: Date;
  @Input() date2BeginSelect: Date;
  @Input() date2EndSelect: Date;

  // MODÈLE DU GRAPHIQUE :

  type = 'line';
  data: any;
  options = this.linechartOptionsService.options;



  ngOnInit(): any {

    console.log(this.nameSpecieSelect);
    console.log(this.zoneSelect);
    console.log(this.dateSelect);
    console.log(this.date2BeginSelect);
    console.log(this.date2EndSelect);

    //  indiquer ici la route vers l'api choisie : getAllFishingDates()...
    this.fishService.getAllFishingDates()
      .subscribe(fishes => {

        let fishing = fishes; // variable créée pour récupérer la liste des données à afficher sur le graphique
        // this.fishes = fishes; // marche pas ici (voir dans le 'search-form' pour utilisation)
        // console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);

        const dateBegin = this.date2BeginSelect;
        // const dateBegin = fishes[0].date;
                // PARSAGE DE DATES (DE DÉBUT ET FIN) : de 'string' au format ('YYYY-MM-DD') vers date Moment.js au format
        // 'fr' et 'LL' (ex : 7 Février 2018) :
        const parsedDateBegin = moment(dateBegin, 'YYYY-MM-DD').locale('fr').format('LL');

        const dateEnd = this.date2EndSelect;
        // const dateEnd = fishes[fishes.length - 1].date;
        const parsedDateEnd = moment(dateEnd, 'YYYY-MM-DD').locale('fr').format('LL');

        // this.type = 'line';

        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - ' // date2BeginDatas
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500'  // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - '
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              borderColor: '#2d9ab7' // #36A2EB
            }
          ]
        };


        // this.data.datasets[0].label.push(nameSpDatas);
        // this.data.datasets[1].label.push(nameSpDatas);

        // this.data.datasets[0].label.push(zonedatas);
        // this.data.datasets[1].label.push(zonedatas);

        if (fishing.length > 0) {        
        // if (Object(fishes).length > 0) {

          for (let i = 0; i < fishing.length; i++) {
          // for (let i = 0; i < Object(fishes).length; i++) {
          //  for (let i = 0; i < Object.keys(fishs).length; i++) {

            const landingPushDatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas = fishes[i].date;  // values : date;
            this.data.labels.push(date2pushdatas);

            // const datepushdatas = fishes[i].date;  // values : date;
            // this.data.labels.push(datepushdatas);

          } // fin de boucle 'for'

        } else {
          alert('Pas de donnée...');
        }

// *****************************************************************

        // test légende détachée : (pb: listes à puces...)

        // const linefishes = document.getElementById('linefishes');
        // const myLineFishes = new Chart(linefishes, {
        //    type: 'line',
        //    options: this.options,
        //    data: this.data,
        // });

        // document.getElementById('legend').innerHTML = myLineFishes.generateLegend();

// *****************************************************************

    });



  } // fin de boucle : ngOnInit,




// *********************************************************************************** //

// *****      REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// *********************************************************************************** //


  onSelect(): any {


  } // FIN DE MÉTHODE 'ONSELECT'












  onReset(): any {


// ACTUALISATION DU GRAPHIQUE DE BASE :

    this.fishService.getAllFishingDates() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
      .subscribe(fishes => {

        let fishing = fishes;

        const dateBegin = fishes[0].date;
        const parsedDateBegin = moment(dateBegin, 'YYYY-MM-DD').locale('fr').format('LL');

        const dateEnd = fishes[fishes.length - 1].date;
        const parsedDateEnd = moment(dateEnd, 'YYYY-MM-DD').locale('fr').format('LL');

        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - '
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500'  // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - '
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              borderColor: '#2d9ab7' // #36A2EB
            }
          ]
        };

        if (fishing.length > 0) {

          for (let i = 0; i < fishing.length; i++) {

            const landingPushDatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas = fishes[i].date;  // values : date;
            this.data.labels.push(date2pushdatas);

          }

        } else {
          alert('Pas de donnée...');
        }

      }
    );

  }



  onDatesLabels() {

    const nameSpSelect$ = this.nameSpecieSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    console.log(nameSpSelect$);

    let  nameSpDatas = nameSpSelect$;  // values: name_specie (du template)
    let labelNameSp = nameSpSelect$;
    console.log(labelNameSp);

     if (nameSpDatas === '' || nameSpDatas === 'Toutes Espèces') {
      nameSpDatas = 'vide';
       labelNameSp = 'Toutes Espèces';
     }

    const zoneSelect$ = this.zoneSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    let zoneDatas = zoneSelect$;
    let labelZone = zoneSelect$;

    // gestion d'une 'ZONE' VIDE :
    if (zoneDatas === '' || zoneDatas === 'Toutes Zones') {
      zoneDatas = 'vide';
      labelZone = 'Toutes Zones';
    }


    // const dateSelect$ = this.dateSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    
    const date2BeginSelect$ = this.date2BeginSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    const date2EndSelect$ = this.date2EndSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    // const date$ = this.searchForm.get('date2').value;

    // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :

    if (date2BeginSelect$ === null) {
      alert('Date de début vide : Veuillez choisir une plage de dates...');
      return;

    } else if (date2EndSelect$ === null) {
      alert('Date de fin vide : Veuillez choisir une plage de dates...');
      return;
    }


// PARSAGE DE LA DATE (UTC) POUR LES LABELS DU GRAPHIQUE : / PROBLÈME DANS LE FORMATAGE : (VERSION QUI MARCHE)

  const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'

  // DATE DE DÉBUT :
  // date transformée  à partir du format UTC
  const dateBeginLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date2BeginSelect$); // parsage (exemple sans 'Moment') = 7 février 2018
  const dateBeginToString = date2BeginSelect$.getFullYear() + '-' + Number(date2BeginSelect$.getMonth() + 1) + '-' + date2BeginSelect$.getDate(); // parsage (exemple) = 2018-2-7

  // DATE DE FIN :
  // date transformée  à partir du format UTC
  const dateEndLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date2EndSelect$);   // parsage (exemple) = 7 février 2018
  const dateEndToString = date2EndSelect$.getFullYear() + '-' + Number(date2EndSelect$.getMonth() + 1) + '-' + date2EndSelect$.getDate();   // parsage (exemple) = 2018-2-7




// ************************************************************************************** //

// *******************  AFFICHAGE DU GRAPHIQUE SELON LA REQUETE SOUHAITÉE  ************** //

// ************************************************************************************** //

    //  indiquer ici la route vers l'api choisie : getAllDates()...
    this.fishService.getAllDates(nameSpDatas, zoneDatas, dateBeginToString, dateEndToString)
      .subscribe(fishes => {

        let fishing = fishes;
        // MÉTHODE RÉCUPÉRANT 'ESPÈCE' ET 'ZONE' SÉLECTIONNÉE

        //  console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);

        this.type = 'line';
        this.options = this.linechartOptionsService.options;

        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + dateBeginLabelToString + ' - ' + dateEndLabelToString
              + ') - ' + labelNameSp, ' ' + labelZone],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500'  // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (' + dateBeginLabelToString + ' - ' + dateEndLabelToString
              + ') - ' + labelNameSp, ' ' + labelZone],
              data: [],
              borderColor: '#2d9ab7' // #36A2EB
            }
          ]
        };

        if (fishing.length > 0) {

          for (let i = 0; i < fishing.length; i++) {

            const landingPushDatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas = fishes[i].date;  // values : date;
            this.data.labels.push(date2pushdatas);

          }

        } else {
          alert('Pas de donnée...');
        }

      }
    );

  } // fin de méthode onDatesLabels()

  
} // fin de classe 'ChartChangeComponent'
