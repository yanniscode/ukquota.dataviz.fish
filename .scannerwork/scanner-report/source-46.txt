import { Injectable } from '@angular/core';

import * as _moment from 'moment';

const moment: typeof _moment = _moment;

@Injectable({
  providedIn: 'root'
})

export class LinechartOptionsService {
  

  public constructor() {};


  // *** Note: MODÈLE DU GRAPHIQUE :

  options = { 
    type: 'line',
    layout: {
      padding: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 0
      }
    },
    labels: [{
      boxWidth: 50,
      padding: 20,
    }],
    datasets: [
      {
        backgroundColor: '#2d9ab7', // Captures: couleur des boîtes à légende et graphiques
        borderColor: '#2d9ab7',
      },
      {
        borderColor: '#ff4500',     
      }
    ],
    responsive: true,
    maintainAspectRatio: true,
    tooltips: {       // *** Note: modif des infos bulles
      enabled: true,
      position: 'nearest', // *** Note: le plus près des points (sinon: choisir 'average')
      borderWidth: 1,
      fontFamily: 'sans-serif', // police de la légende
      titleFontSize: 18,
      bodyFontSize: 16,
      usePointStyle: true,
      callbacks: {
        title: function(tooltipItem): string {

          const title: string = 'Date : ' + tooltipItem[0].xLabel || '';
          const parsedTitle: string = moment(title, 'YYYY-MM-DD').format('DD-MM-YYYY');

          return parsedTitle;
        },
        label: function(tooltipItem): string {  // *** Note: méthode pour ajouter les données du graphique aux 'tooltips'

          const datas: string = tooltipItem.yLabel;

          const capturesLabel: string = 'Quantité : ' + datas +' tonnes'|| '';
          const quotasLabel: string = 'Quota : ' + datas +' tonnes' || '';

          if (capturesLabel != null && tooltipItem.datasetIndex === 0) {
            return capturesLabel;
          }
          if (quotasLabel != null && tooltipItem.datasetIndex === 1) {
            return quotasLabel;
          }

        }
      }
    },
    legend: {
      display: true,
      fullWidth: false,
      position: 'top',
      align: 'right',
      labels: {
        values: [],
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontColor: 'black',
        padding: 10,      //  // *** Note: marge du haut (pb: appliquée à tout le caneva...)
        usePointStyle: true, //  // *** Note: les icônes de la légende apparaissent sous forme de points
      }
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif',
          fontSize: 16,
          padding: 20,
          labelString: 'Dates de Captures et de Quotas',
          fontColor: 'black'
        },
        ticks: {
          type: 'time',
          distribution: 'linear', // AJOUT : data are spread according to their time (distances can vary)
        fontSize: 16,
          beginAtZero: true,
        },
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MM-YYYY', // *** Note: format en anglais, si en lettres
          }
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif',
          fontSize: 16,
          padding: 20,
          fontColor: 'black',
          labelString: 'Quantités en Tonnes (T)',
        },
        stacked: false,
        ticks: {
          fontFamily: 'sans-serif',
          fontSize: 16,
          beginAtZero: true,
          padding: 10,
        }
      }]
    },
    title: {
      padding: 20
    },
    animation: {
      duration: 1000 // *** Note: general animation time (ms)
    },
    hover: {
        animationDuration: 1000 // *** Note: duration of animations when hovering an item
    },
    responsiveAnimationDuration: 1000, // *** Note: animation duration after a resize

  };


}

