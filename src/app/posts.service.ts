import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }


  // Get all posts from the API
  // partie back-end (route qui affiche les infos au format '.json'.
  // Elles seront récupérées par le Front-End pour être affichée sur 'localhost:3000/posts

  getAllFishings() {
    return this.http.get('/api/AllFishings') // REQUÊTE GÉNÉRALE : 'AllFishings'
    .map(res => res.json());
  }
  getOneFishing() {
    return this.http.get('/api/NorthSeaCodAtDate') // REQUÊTE PRÉCISE : 'NorthSeaCodAtDate'
      .map(res => res.json());
  }


}
