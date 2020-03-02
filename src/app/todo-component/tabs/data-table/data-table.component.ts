// // NOUVELLE VERSION, QUI NE MARCHE PAS (fishService par reconnu !)

// import { Component, OnInit, ViewChild  } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FishService } from '../../../todo-data-service/fish.service';

// // import { AgGridNg2 } from 'ag-grid-angular';
// import {GridOptions} from "ag-grid-community";

// @Component({
//   selector: 'app-data-table',
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.scss']
// })

// export class DataTableComponent implements OnInit {

//   private gridOptions: GridOptions;
//   private http: HttpClient;
//   private fishService: FishService;

//   // @ViewChild('agGrid') agGrid: AgGridNg2;

//   title = 'my Filter Grid !';
//   agGrid: any;
//   rowData: any;

//   constructor() {
//     // this.http = HttpClient,
//     this.fishService;

//     this.gridOptions = <GridOptions>{};
//     this.gridOptions.columnDefs = [
    
//     // columnDefs = [
//     {
//       headerName: 'Id Fishing',
//       field: 'id_fishing',
//       width: 200,
//     },
//     {
//       headerName: 'Value Landing',
//       field: 'value_landing',
//       width: 200
//     },
//     {
//       headerName: 'Value Quota',
//       field: 'value_quota',
//       width: 200
//     },
//     {
//       headerName: 'Date',
//       field: 'date',
//       width: 200
//     },
//     {
//       headerName: 'Name Specie',
//       field: 'name_specie',
//       width: 150
//     },
//     {
//       headerName: 'Super Zone',
//       field: 'super_zone',
//       width: 200
//     },
//     {
//       headerName: 'Zone',
//       field: 'zone',
//       width: 200
//     }

//   ];


//   //   this.gridOptions.rowData = [
//   //     {id: 5, value: 10},
//   //     {id: 10, value: 15},
//   //     {id: 15, value: 20}
//   //   ]

//   }


//   // constructor(
//   //   private http: HttpClient,
//   //   private fishService: FishService
//   //   ) { }

//   ngOnInit() {
//       this.rowData = this.fishService.getAllFishings();
//   }

//   getSelectedRows() {
//     const selectedNodes = this.agGrid.api.getSelectedNodes();
//     const selectedData = selectedNodes.map( node => node.data );
//     // console.log(selectedData);
//     const selectedDataStringPresentation = selectedData.map( node => node.id_fishing + ' - ' + node.value_landing + ' - ' + node.value_quota
//     + ' - ' + node.date + ' - ' + node.name_specie + ' - ' + node.super_zone + ' - ' + node.zone).join('; ');
//     alert(`Selected nodes: ${selectedDataStringPresentation}`);
//   }

// }




// ********************************************

// VERSION PRÉCÉDENTE (AVANT MISE À JOUR)

import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish';

// import { AgGridNg2 } from 'ag-grid-angular';
import { AgGridAngular } from 'ag-grid-angular';
import {GridOptions} from "ag-grid-community";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {

  public fishing$: Fish[];

  // @ViewChild('agGrid') agGrid: AgGridAngular;
  // @ViewChild('agGrid') agGrid: AgGridNg2;
  private agGrid: AgGridAngular;

  title = 'my Filter Grid !';

  columnDefs = [
    {
      headerName: 'Id Fishing',
      field: 'id_fishing',
      width: 100,
    },
    {
      headerName: 'Value Landing',
      field: 'value_landing',
      width: 130
    },
    {
      headerName: 'Value Quota',
      field: 'value_quota',
      width: 130
    },
    {
      headerName: 'Date',
      field: 'date',
      width: 100
    },
    {
      headerName: 'Name Specie',
      field: 'name_specie',
      width: 150
    },
    {
      headerName: 'Super Zone',
      field: 'super_zone',
      width: 200
    },
    {
      headerName: 'Zone',
      field: 'zone',
      width: 200
    }
  ];

  rowData: any;

  constructor(
    private http: HttpClient,
    private fishService: FishService,
    // private gridOptions: GridOptions // marche pas
  ) { }

  ngOnInit() {
      this.rowData = this.fishService.getAllFishings();
      // this.gridOptions.defaultColDef.filter=true // marche pas
  }

  // getSelectedRows() {
  //   const selectedNodes = this.fishService.getAllFishings();
  //   // const selectedNodes = this.agGrid.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map(node => node.data);
  //   // console.log(selectedData);
  //   const selectedDataStringPresentation = selectedData.map( node => node.id_fishing + ' - ' + node.value_landing + ' - ' + node.value_quota
  //   + ' - ' + node.date + ' - ' + node.name_specie + ' - ' + node.super_zone + ' - ' + node.zone).join('; ');
  //   alert(`Selected nodes: ${selectedDataStringPresentation}`);
  // }

  getSelectedRows() {
    this.fishService.getAllFishings()
    .subscribe(fishing$ => {
      
      this.fishing$ = fishing$;
      console.log(fishing$[0].name_specie);

      const selectedDataStringPresentation = fishing$[0].id_fishing + ' - ' + fishing$[0].value_landing + ' - ' + fishing$[0].value_quota
      + ' - ' + fishing$[0].date + ' - ' + fishing$[0].name_specie + ' - ' + fishing$[0].super_zone + ' - ' + fishing$[0].zone;

      alert(`Selected nodes: ${selectedDataStringPresentation}`);

    });
  }

}
