// modèle pour les données :

export class Fish {

    public static fromJson(json: Object): Fish {
        
        return new Fish(
            json['id_fishing'],
            json['value_landing'],
            json['value_quota'],
            json['date'],
            json['name_specie'],
            json['super_zone'],
            json['zone'],
            json['z_coord'],
            json['sz_coord']
        );

    }

    constructor(
        public id_fishing: number,
        public value_landing: number,
        public value_quota: number,
        public date: string, // Date dans la BDD
        public name_specie: string,
        public super_zone: string,
        public zone: string,
        public z_coord: JSON,
        public sz_coord: JSON
    ) {}

}

// console.log('Fish constructor OUTPUT : ' + Fish);


/*
export class Fish {
    id_fishing: number;
    value_landing: number;
    value_quota: number;
    date: string;
    name_specie: string;
    super_zone: string;
    zone: string;
}


console.log('Fish constructor OUTPUT : ' + Fish);
*/


/*
export interface IUserResponse {
    total: number;
    results: Fish[];
}



/* exemple : http://localhost:3000/api/AllFishings
    {
        "id_fishing": 1;
        "value_landing": 18411;
        "value_quota": 20274;
        "date": "2018-02-06";
        "name_specie": "Cod";
        "super_zone": "North sea";
        "zone": "North sea"
    }
*/
