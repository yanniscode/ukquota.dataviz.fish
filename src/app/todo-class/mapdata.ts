// modèle pour les données réelles ?? (à tester)

// export class Mapdata {
//     public static fromJson(json: Object): Mapdata {
//         return new Mapdata(
//             json['id_super_zone'],
//             json['super_zone'],
//             json['super_zone_coord']
//         );
//     }

//     constructor(
//         public id_super_zone: number,
//         public super_zone: string,
//         public super_zone_coord: string
//     ) {}

// }



// ***************
// modèle pour 'in-memory-data-service' (en test)

export class Mapdata {
    id_super_zone: number;
    date: string;
    name_specie: string;
    zone: string;
    super_zone: string;
    value_landing: number;
    value_quota: number;
    z_coord: string;
    sz_coord: string;
}
