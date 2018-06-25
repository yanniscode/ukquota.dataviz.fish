import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }


  // Get all posts from the API
  getAllPosts() {
    return this.http.get('/api/tableau')
    .map(res => res.json());
  }
  getOnePost() {
    return this.http.get('/api/tableau2') // value_landing: 14712, date: "2017-11-15" (ex)
      .map(res => res.json());
  }
}
