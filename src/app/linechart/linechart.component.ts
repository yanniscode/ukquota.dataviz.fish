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
  Directive
} from '@angular/core';

import { LinechartService } from '../linechart.service';

import { Http } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';

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
  /*  responsive: true, */ // cf : fichier 'linechart.component.css'
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
  };


  // CHART STRUCTURE:

  chartData: any = [
    {
      data : [],
      label: 'Captures',
    },
    {
      data : [],
      label: 'Quotas',
    }
  ];
  chartLabels = [];

  onChartClick(event) {
    console.log(event);
  }


//  constructor(private linechartService: LinechartService) { }

ngOnInit(): any {

// ******************** TEST BOUCLE 'for': (à revoir) : les cabillauds pêchés dans différentes zones à une date donnée

  this.httpService.get('./api/CodAtDate', {responseType: 'json'})
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

          const zonedatas = fishs[i].zone;  // values : zone;
          console.log('zonedatas :');
          console.log(zonedatas);
          this.chartLabels.push(zonedatas);
          console.log('this.chartLabels :');
          console.log(this.chartLabels);

        } // fin de boucle 'for'

      }
    );

  this.httpService.get('./api/CodAtDate', {responseType: 'json'})
    .subscribe(
      fishs => {

        for (let i = 0; i < Object.keys(fishs).length; i++) {

          this.chartData = [
            {
              data: [],
              label: [Object.keys(fishs[i])[0], ' ' + Object.values(fishs[i])[3], ' ' + Object.values(fishs[i])[4], ' '
              + Object.values(fishs[i])[2]],
            },
            {
              data: [],
              label: [Object.keys(fishs[i])[1], ' ' + Object.values(fishs[i])[3], ' ' + Object.values(fishs[i])[4], ' '
              + Object.values(fishs[i])[2]],
            }
          ];

          console.log('this.chartData (bis):');
          console.log(this.chartData);
          console.log(Object.keys(fishs[i])[0]);
        }

      }
    );


  } // fin de boucle : ngOnInit


} // fin de boucle : export class
