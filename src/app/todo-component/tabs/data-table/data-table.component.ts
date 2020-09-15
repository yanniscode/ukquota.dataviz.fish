import { Component } from '@angular/core';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../shared/todo-class/fish';
import { GridApi, GridOptions, RowNode } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [
    FishService,
  ]
})


export class DataTableComponent {

  public title = 'Dernières données de pêche';

  private fishing$: Fish[] = [];

  private gridApi: GridApi = null;
  private rowHeight: number = null;
  private columnDefs: Object[] = [{}];
  private sortingOrder: string[] = [];


  public constructor(
    private fishService: FishService,
  ) { 

    this.rowHeight = 40;

    this.columnDefs = [
      {
        headerName: 'Id Fishing',
        field: 'id_fishing',
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: 'Value Landing',
        field: 'value_landing',
        width: 200,
        sortingOrder: ["asc", "desc", null]
      },
      {
        headerName: 'Value Quota',
        field: 'value_quota',
        width: 200,
        sortingOrder: ["asc", "desc", null]
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 150,
        sortingOrder: ["asc", "desc", null]
      },
      {
        headerName: 'Name Specie',
        field: 'name_specie',
        width: 220,
        sortingOrder: ["asc", "desc", null]
      },
      {
        headerName: 'Super Zone',
        field: 'super_zone',
        width: 220,
        sortingOrder: ["asc", "desc", null]
      },
      {
        headerName: 'Zone',
        field: 'zone',
        width: 220,
        sortingOrder: ["asc", "desc", null]
      }
    ];

    this.sortingOrder= ["asc", "desc", null];

    this.fishService = fishService;

  }


  private onGridReady(params: GridOptions): void {

    // *** Note: "params.api" permet d'appeler les méthodes de AgGrid (API):
    this.gridApi = params.api;  
    
    const fishingDataSubscription: Subscription = this.fishService.getAllFishingsAtDate()
    .subscribe(data => {
      this.fishing$ = data;
      this.gridApi.setRowData(this.fishing$);
    });

    setTimeout(() => {
      fishingDataSubscription.unsubscribe();
    }, 10000);

  }


  private getSelectedRows(): void {
    
    const selectedNodes: RowNode[] = this.gridApi.getSelectedNodes();  
    
    const selectedData: Fish[] = selectedNodes.map(fishingNode => fishingNode.data);

    const selectedDataStringPresentation: string = selectedData.map(fishingNode => 'id_fishing: '+ fishingNode.id_fishing +' - value_landing: '+ fishingNode.value_landing +' tonnes - value_quota: '+ fishingNode.value_quota +' tonnes - date: '+ fishingNode.date +' - '+ fishingNode.name_specie +' - super-zone: '+ fishingNode.super_zone +' - zone: '+ fishingNode.zone).join(' ; ');
    
    alert(`Données sélectionnées: ${ selectedDataStringPresentation }`);
  }


}