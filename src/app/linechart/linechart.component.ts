import { Chart } from 'chart.js';

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

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})

export class LinechartComponent implements OnInit {


  constructor (private httpService: HttpClient) { }


  // instantiate posts to an empty array :

  linechartPosts: any = [];

  // ADD CHART OPTIONS.
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          }
      }]
    }
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


//  INSERTION DE DONNEES D'UN OBJET EXTRAIT DE LA BDD (ne prend pas encore les abscisses en même temps)

  public ngOnInit(): any {

    this.httpService.get('./api/landing', {responseType: 'json'})
    .subscribe(
      fishs => {
        Object.entries(fishs).forEach(([key, val]) => {

          this.chartData = [
            {
              data : [Object.values(fishs)[0]],
              label: [Object.keys(fishs)[0]],
            },
            {
              data : [Object.values(fishs)[1]],
              label: [Object.keys(fishs)[1]],
            }
          ];
          this.chartLabels = [Object.values(fishs)[2]]; // Attention : marche uniquement seul (si l'on retire 'chartData')

        },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          }
        );
      }
    );

  }


}
