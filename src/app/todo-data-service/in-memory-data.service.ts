import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Mapdata } from '../todo-class/mapdata';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const mapdatas = [
      {
        id_super_zone: 1,
        date: '2019-07-19',
        name_specie: 'Cod',
        zone: 'North Sea (in memory)',
        super_zone: 'North Sea (in memory)',
        z_coord: [
          [55, 0],
          [58, 0],
          [58, 4],
          [55, 4],
          [55, 0]
        ],
        sz_coord: [],
        value_landing: 800,
        value_quota: 1500
      },
      {
        id_super_zone: 2,
        date: '2019-07-19',
        name_specie: 'Cod',
        zone: 'Norway (in memory)',
        super_zone: 'Norway (in memory)',
        z_coord: [
          [60, -2],
          [64, -2],
          [64, 2],
          [60, 2],
          [60, -2]
        ],
        sz_coord: [],
        value_landing: 1501,
        value_quota: 1500
      },
      {
        id_super_zone: 3,
        date: '2019-07-19',
        name_specie: 'Cod',
        zone: 'West Of Scotland (in memory)',
        super_zone: 'West Of Scotland (in memory)',
        z_coord: [
          [56, -12],
          [58, -12],
          [58, -8],
          [56, -8],
          [56, -12]
        ],
        sz_coord: [],
        value_landing: 1500,
        value_quota: 1500
      },
      {
        id_super_zone: 4,
        date: '2019-07-19',
        name_specie: 'Cod',
        zone: 'Irish Sea (in memory)',
        super_zone: 'Irish Sea (in memory)',
        z_coord: [
          [50, -8],
          [53, -8],
          [53, -4],
          [50, -4],
          [50, -8]
        ],
        sz_coord: [],
        value_landing: 1800,
        value_quota: 1500
      }
    ];
    console.log(mapdatas);
    return {mapdatas};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  // genId(mapdatas: Mapdata[]): number {
  //   return mapdatas.length > 0 ? Math.max(...mapdatas.map(mapdata => mapdata.id_super_zone)) + 1 : 11;
  // }

}
