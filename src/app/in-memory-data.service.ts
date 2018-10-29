// TEST FORMULAIRE DE REQUETE (auto-complétion marche ici, mais pas avec des données réelles...)

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const fishes = [ // fishes renvoie 'api/fishes'
            { id_fishing: 11, value_landing: 18411, value_quota: 20274, date: '2018-02-06', name_specie: 'Cod',
            super_zone: 'North sea', zone: 'North sea' },
            { id_fishing: 12, value_landing: 32165, value_quota: 456, date: '2001-01-01', name_specie: 'Haddock',
            super_zone: 'Black sea', zone: 'North sea' },
            { id_fishing: 13, value_landing: 18411, value_quota: 20274, date: '2018-02-06', name_specie: 'Sardine',
            super_zone: 'Red sea', zone: 'North sea' },
            { id_fishing: 14, value_landing: 18411, value_quota: 20274, date: '2018-02-06', name_specie: 'Megrim',
            super_zone: 'Ireland sea', zone: 'North sea' },
            { id_fishing: 15, value_landing: 18411, value_quota: 20274, date: '2018-02-06', name_specie: 'Hippocampe',
            super_zone: 'North sea', zone: 'North sea' }
        ];
        return {fishes};
    }
}

/* exemple : http://localhost:3000/api/CodAtZone
    {
        "value_landing": 18411;
        "value_quota": 20274;
        "date": "2018-02-06";
        "name_specie": "Cod";
        "super_zone": "North sea";
        "zone": "North sea"
    }
*/

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
