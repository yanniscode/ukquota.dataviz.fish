// modèle pour les données des utilisateurs :

export class User {

    public static fromJson(json: Object): User {

        return new User(
            json['id_user'],
            json['user_firstname'],
            json['user_lastname'],
            json['login'],
            json['password'],
            json['mail']
        );

    }

    constructor(
        public id_user: number,
        public user_firstname: string,
        public user_lastname: string,
        public login: string,
        public password: string,
        public mail: string
    ) {}

}
