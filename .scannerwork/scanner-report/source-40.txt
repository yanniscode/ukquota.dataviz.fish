import { Component, Input, ElementRef, OnInit, OnChanges, OnDestroy, SimpleChanges, Output, EventEmitter, NgZone } from '@angular/core';

import { Chart, ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-update',
  templateUrl: './chart-update.component.html',
  styles: [':host { display: block; }']
})

export class ChartUpdateComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() chart: Chart;
  @Input() type: ChartType;
  @Input() data: ChartData;
  @Input() options: ChartOptions;

  @Output() clickCanvas: EventEmitter<unknown> = new EventEmitter();
  @Output() clickDataset: EventEmitter<unknown> = new EventEmitter();
  @Output() clickElements: EventEmitter<unknown> = new EventEmitter();
  @Output() clickElement: EventEmitter<unknown> = new EventEmitter();

  private canvas: HTMLCanvasElement;

  public constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {
	this.create();	
  }


  ngOnChanges(changes: SimpleChanges): void {

      console.log("on chart Change !");

      if (this.chart) {

        console.log(this.chart);

        if (changes['type'] || changes['options']) {

          this.create();

        } else if (changes['data']) {

          const currentValue: SimpleChanges = changes['data'].currentValue;
          ['datasets', 'labels', 'xLabels', 'yLabels'].forEach(property => {
            this.chart.data[property] = currentValue[property];
          });

          console.log(currentValue);
        
        // *** Note: utile sinon l'animation des graphiques et les tooltips (étiquettes de données) ne semblent plus s'afficher sur les graphiques lorqu'on y accède plusieurs fois... :
          this.chart.update(); 

        }

      }

  }

  ngOnInit(): void {
      console.log("on chart Init !");
  }

  ngOnDestroy(): void {

    console.log("onChart Destroy !");
    
    this.ngZone.runOutsideAngular(() => {

      if(this.canvas) {
        this.elementRef.nativeElement.removeChild(this.canvas);
        this.chart = null;
      }

    });

  }
  

  private create(): void {

    this.ngZone.runOutsideAngular(() => {

      if (this.canvas) {
        this.elementRef.nativeElement.removeChild(this.canvas);
      }

      this.canvas = document.createElement('canvas');
      this.elementRef.nativeElement.appendChild(this.canvas);

      this.chart = new Chart(this.canvas, {
        type: this.type,
        data: this.data,
        options: this.options
      });

      this.canvas.onclick = e => {

        this.ngZone.run(() => {

          this.clickCanvas.next(e);

          if (this.clickDataset.observers.length) {
            this.clickDataset.next(this.chart.getDatasetAtEvent(e));
          }

        });

      };

    });

  }


}
