import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BarchartOptionsService {


  public constructor() { };


  options = {

    type: 'bar',
    responsive: true,
    maintainAspectRatio: true,
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
    tooltips: {       // *** Note: modif des infos bulles
      enabled: true,
      position: 'nearest',
      fontFamily: 'sans-serif',
      titleFontSize: 18,
      bodyFontSize: 16,
      callbacks: {
        title: function(tooltipItem): string {          
          const title: string = tooltipItem[0].xLabel || '';
          return title;
        },
        label: function(tooltipItem): string {

          const datas: string = tooltipItem.value; // *** Note: paramètre pour accéder aux données du graphique

          const capturesLabel: string  = 'Quantité : ' + datas +' tonnes' || '';
          const quotasLabel: string = 'Quota : ' + datas  +' tonnes' || '';

          if (capturesLabel != null && tooltipItem.datasetIndex === 0) {
            return capturesLabel;
          }

          if (quotasLabel != null && tooltipItem.datasetIndex === 1) {
            return quotasLabel;
          }

        },
      },
    },
    legend: {
      display: true,
      fullWidth: false,
      position: 'top',
      align: 'right',
      labels: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontColor: 'black',
        usePointStyle: true
      },
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
          fontFamily: 'sans-serif',
          fontSize: 18,
          beginAtZero: true,
        },
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
          fontColor: 'black',
          beginAtZero: true,
        }
      }]
    },
    title: {
      padding: 20,
    },
    hover: {
      animationDuration: 1000, // *** Note: duration of animations when hovering an item
    },
    responsiveAnimationDuration: 1000, // *** Note: animation duration after a resize

  };


}

