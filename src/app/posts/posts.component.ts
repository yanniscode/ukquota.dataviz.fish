import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  // instantiate posts to an empty array

  posts: any = [];

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
 // Retrieve posts from the API

    this.postsService.getSomeFishings().subscribe(posts => {
      this.posts = posts;
    });

/*
    this.postsService.getSomeFishings().subscribe(dataset => {
      this.posts = dataset;
      console.log(dataset);
    });
  */
/*    this.postsService.getOneFishing().subscribe(dataset => {
      this.posts = dataset;
      console.log(dataset);
    }); */
  }

/*
export class NameSpeciePostsComponent implements OnInit {

  // instantiate posts to an empty array

  posts: any = [];

  constructor(
    private nameSpeciePostsService: NameSpeciePostsService
  ) { }
*/

/*  ngOnInit() {
 // Retrieve posts from the API
    this.nameSpeciePostsService.getNameSpeciePosts().subscribe(posts => {
      this.posts = posts;
    });
*/
/*    this.postsService.getOneFishing().subscribe(dataset => {
      this.posts = dataset;
      console.log(dataset);
    }); */

//  }

 }
