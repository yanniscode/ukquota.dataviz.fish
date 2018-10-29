// modèle pour les données réelles :

export class Fish {
    id_fishing: number;
    value_landing: number;
    value_quota: number;
    date: string;
    name_specie: string;
    super_zone: string;
    zone: string;
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
