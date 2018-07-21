import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // ajout (utile ?)

@Injectable()
export class LinechartService {

  constructor(private http: Http) { }

  // Get all posts from the API == partie back-end (route qui affiche les infos au format '.json'.
  // Elles seront récupérées par le Front-End pour être affichée sur 'localhost:3000/linechart'
  // ATTENTION : methode qui ne marche pas >> utiliser la classe LinechartComponent à la place (dans 'linechart.component.ts')

  getAllFishings() {
    return this.http.get('/api/AllFishings') // objet 'fishing' (id, values, zone...)
      .map(res => res.json());
  }
  getOneFishing() {
    return this.http.get('/api/NorthSeaCodAtDate') // value_landing: 14712, date: "2017-11-15" (ex)
      .map(res => res.json());
  }

}
