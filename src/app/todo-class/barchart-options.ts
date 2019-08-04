import { Injectable } from '@angular/core';

import Chart from 'chart.js';

import * as _moment from 'moment';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class BarchartOptionsService {

  constructor() { }



    // *****************************

  // MODÈLE DU GRAPHIQUE :

// *****************************

// const Chart = require('chart.js');

// require(['../node_modules/chart.js/dist/Chart.js'], function(Chart) {

// const canvas = <HTMLCanvasElement> document.getElementById('mycanvas');
// const ctx = this.canvas.getContext('2d');
// const ctx = document.getElementById('myChart');
// const ctx = document.getElementById('myChart').getContext('2d');
// const ctx = 'myChart';

// Chart.defaults.global.defaultFontFamily = 'source-sans-pro'; // marche pas


// const myChart = new Chart(this.ctx, { // marche pas

  type = 'bar';

  // data: data, // marche pas
  data: any = {

    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
        borderColor: '#ff4500' // backgroundColor: '#FF6384'
      },
      {
        label: [],
        data: [],
        borderColor: '#2d9ab7' // #36A2EB (bleu de base)
      }
    ]
  };

  options = {
    responsive: true,
    tooltips: { // modif des infos bulles
      enabled: true,
      position: 'nearest',
      fontFamily: 'sans-serif', // police de la légende // source-sans-pro
      fontSize: 10,
      callbacks: {
        title: function(tooltipItem /*, data */) {
          const title = tooltipItem[0].xLabel || '';
          return title;
        },
        label: function(tooltipItem, data) {

          const label = tooltipItem.yLabel; // paramètre pour accéder aux chiffres du graphique

          const labelCaptures = 'Quantité (en tonnes) : ' + label || '';
          const labelQuotas = 'Quota (en tonnes) : ' + label || '';

          if (labelCaptures != null && tooltipItem.datasetIndex === 0) {
            // labelCaptures += ' tonnes';
            return labelCaptures;
          }
          if (labelQuotas != null && tooltipItem.datasetIndex === 1) {
            // labelQuotas += ' tonnes';
            return labelQuotas;
          }

          // alert(tooltipItem.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          // alert(data.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]

        }
      }
    },
    legend: {
      display: true,
      labels: {
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 14,
        fontColor: 'black',
        padding: 20, // marge du haut
        usePointStyle: true
      }
    },
    //  maintainAspectRatio: true,
    scales: {
      xAxes: [{
        // type: 'time', // AJOUT
        distribution: 'linear', // AJOUT :data are spread according to their time (distances can vary)
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif', // source-sans-pro
          fontSize: 14,
          padding: 20,
          labelString: 'Dates de Captures et de Quotas',
          fontColor: 'black'
        },
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 14,
        // fontColor: 'black',
        ticks: {
          beginAtZero: true,
          // callback: function(value) {
          //   return new Date(value).toLocaleDateString('fr-FR', {month: 'short', year: 'numeric'});
          // },
        },
        // time: {
        //   unit: 'month',
        //   // unit: 'day',
        //   displayFormats: {
        //     month: 'MM-YYYY', // format en anglais, si en lettres
        //     // day: 'DD-MM-YYYY'
        //   }
        // }
      }],
      yAxes: [{
        // distribution: 'linear', // AJOUT :data are spread according to their time (distances can vary)
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 14,
        fontColor: 'black',
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif', // source-sans-pro
          fontSize: 14,
          padding: 20,
          fontColor: 'black',
          labelString: 'Quantités en Tonnes (T)',
        },
        stacked: false,
        ticks: {
          beginAtZero: true
          // callback: function(value, index, values) {
          //   // alert(value.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          //   return value + ' T';
          // }
        }
      }]
    },
    labels: [{
      // MODIF enlevé : chartLabels
    }],

    // pan: { // PAN DÉSACTIVÉ
    //   enabled: false,
    //   mode: 'xy',
    //   speed: 20,
    //   threshold: 10
    // },
    // zoom: { // ZOOM DÉSACTIVÉ
    //   enabled: false,
    //   mode: 'xy',
    //   sensitivity: 100,
    //   rangeMin: {
    //     // Format of min pan range depends on scale type
    //     x: null,
    //     y: 0  // le graphique ne prend pas en compte les chiffres négatifs
    //   },
    // },
    // rangeMax: {
    //   // Format of max pan range depends on scale type
    //   x: null,
    //   y: null
    // }

  };

// });

// });

}

