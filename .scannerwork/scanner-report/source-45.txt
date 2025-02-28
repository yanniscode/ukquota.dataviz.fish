// *** Note: Modèle pour les données de pêche :

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

    public constructor(
        public id_fishing: number,
        public value_landing: number,
        public value_quota: number,
        public date: string,    // *** type = Date dans la BDD
        public name_specie: string,
        public super_zone: string,
        public zone: string,
        public z_coord: JSON,
        public sz_coord: JSON
    ) {}

}