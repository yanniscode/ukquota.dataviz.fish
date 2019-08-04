import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FishService } from '../../../todo-data-service/fish.service';

import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'my Filter Grid !';

  columnDefs = [
    {
      headerName: 'Id Fishing',
      field: 'id_fishing',
      width: 200,
    },
    {
      headerName: 'Value Landing',
      field: 'value_landing',
      width: 200
    },
    {
      headerName: 'Value Quota',
      field: 'value_quota',
      width: 200
    },
    {
      headerName: 'Date',
      field: 'date',
      width: 200
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
    private fishService: FishService
    ) { }

  ngOnInit() {
      this.rowData = this.fishService.getAllFishings();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    // console.log(selectedData);
    const selectedDataStringPresentation = selectedData.map( node => node.id_fishing + ' - ' + node.value_landing + ' - ' + node.value_quota
    + ' - ' + node.date + ' - ' + node.name_specie + ' - ' + node.super_zone + ' - ' + node.zone).join('; ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
