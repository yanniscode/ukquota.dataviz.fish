import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  EventEmitter,
  ElementRef,
  Input,
  Output,
  NgModule,
  SimpleChanges,
  Directive,
  NgZone
} from '@angular/core';

// import { LinechartService } from '../linechart.service';

// import { Http } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';

import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})


export class LinechartComponent implements OnInit {

  title = 'Dataviz.fish';

  constructor (private httpService: HttpClient) { }


  // instantiate posts to an empty array :

  linechartPosts: any = [];

  // ADD CHART OPTIONS :
  chartOptions = {
    responsive: true,  // cf : fichier 'linechart.component.css'
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,  // option = graphic begins at 0
        }
      }],
    },
    chartLabels: [{
      time: {
        unit: 'day'
      }
    }],
    pan: {
      enabled: true,
      mode: 'xy',
      speed: 20,
      threshold: 10
    },
    zoom: {
      enabled: true,
      mode: 'xy',
      sensitivity: 100,
      rangeMin: {
        // Format of min pan range depends on scale type
        x: null,
        y: 0  // le graphique ne prend pas en compte les chiffres négatifs
      },
      rangeMax: {
        // Format of max pan range depends on scale type
        x: null,
        y: null
      }
    }
  };


  // CHART STRUCTURE:
  chartData: any = [
    {
      data: [],
      label: 'Captures'
    },
    {
      data: [],
      label: 'Quotas'
    }
  ];
  chartLabels = [];

  onChartClick(event) {
    console.log(event);
  }


//  constructor(private linechartService: LinechartService) { }

ngOnInit(): any {

// ******************* LABELS (TEST A) */

/* Pour la pêche numéro 0 :
Object.values(fishs[0])[0] = value_landing
Object.values(fishs[0])[1] = value_quota
Object.values(fishs[0])[2] = date
Object.values(fishs[0])[3] = name_specie
Object.values(fishs[0])[4] = super_zone
Object.values(fishs[0])[5] = zone
*/

  this.httpService.get('./api/CodAtZone', {responseType: 'json'})
    .subscribe(
      fishs => {

        this.chartData = [
          {
            data: [],
            label: [
              Object.keys(fishs[0])[0], ' ' + Object.values(fishs[0])[3], /* ' ' + Object.values(fishs[0])[2],*/ ' '
              + Object.values(fishs[0])[4]
            ],
          },
          {
            data: [],
            label: [
              Object.keys(fishs[0])[1], ' ' + Object.values(fishs[0])[3], /* ' ' + Object.values(fishs[0])[2],*/ ' '
              + Object.values(fishs[0])[4]
            ],
          }
        ];

        console.log('this.chartData (bis):');
        console.log(this.chartData);
        console.log(Object.keys(fishs[0])[0]);

// ******************** LABELS (TEST B) avec BOUCLE 'for' (à voir, si nécessaire) - EX : les cabillauds pêchés dans différentes
// zones à une date donnée


/*        for (let i = 0; i < Object.keys(fishs).length; i++) {

          this.chartData = [
            {
              data: [],
              label: [
                Object.keys(fishs[i])[0], ' ' + Object.values(fishs[i])[3], ' ' + Object.values(fishs[i])[2]
              ],
            },
            {
              data: [],
              label: [
                Object.keys(fishs[i])[1], ' ' + Object.values(fishs[i])[3], ' ' + Object.values(fishs[i])[2]
              ],
            }
          ];

          console.log('this.chartData (bis):');
          console.log(this.chartData);
          console.log(Object.keys(fishs[i])[0]);


        }
*/

      }
    );

  /* DATAS : */
  this.httpService.get('./api/CodAtZone', {responseType: 'json'})
  // possibilité de changer le chemin ici pour transformer la requête SQL manuellement (ex : './api/CodAtDate')
    .subscribe(
      fishs => {

        for (let i = 0; i < Object.keys(fishs).length; i++) {

          console.log(fishs[i]);
          console.log('Obj length :');
          console.log(Object.keys(fishs).length);

          console.log('Obj values:');
          console.log(Object.values(fishs));

          console.log(fishs[i].value_landing);
          console.log(fishs[i].value_quota);
          console.log(fishs[i].date);

          const landingdatas = fishs[i].value_landing;  // values: value_landing
          console.log('landingdatas :');
          console.log(landingdatas);
          this.chartData[0].data.push(landingdatas);
          console.log('this.chartData (landing):');
          console.log(this.chartData[0].data);

          const quotadatas = fishs[i].value_quota;  // values: value_quota
          console.log('quotadatas :');
          console.log(quotadatas);
          this.chartData[1].data.push(quotadatas);
          console.log('this.chartData (quota):');
          console.log(this.chartData[1].data);

/*          const zonedatas = fishs[i].zone;  // values : zone; // à modifier au besoin
          console.log('zonedatas :');
          console.log(zonedatas);
          this.chartLabels.push(zonedatas);
          console.log('this.chartLabels :');
          console.log(this.chartLabels);
*/
          const datedatas = fishs[i].date;  // values : date;
          console.log('datedatas :');
          console.log(datedatas);
          this.chartLabels.push(datedatas);
          console.log('this.chartLabels :');
          console.log(this.chartLabels);


/*        const speciesdatas = fishs[i].name_specie;  // values : name_specie; // à modifier au besoin
          console.log('speciesdatas :');
          console.log(speciesdatas);
          this.chartLabels.push(speciesdatas);
          console.log('this.chartLabels :');
          console.log(this.chartLabels);
*/
        } // fin de boucle 'for'

      }
    );
/*
    this.httpService.get('./api/CodAtDate', {responseType: 'json'})
    // possibilité de changer le chemin ici pour changer de requête manuellement (ex : './api/CodAtDate')
      .subscribe(
        fishs => {

        for (let i = 0; i < Object.keys(fishs).length; i++) {

          const datedatas = fishs[i].date;  // values : zone;
          console.log('datedatas :');
          console.log(datedatas);
          this.chartLabels.push(datedatas);
          console.log('this.chartLabels :');
          console.log(this.chartLabels);

        } // fin de boucle 'for'

      }
    );
*/



  } // fin de boucle : ngOnInit


} // fin de boucle : export class
