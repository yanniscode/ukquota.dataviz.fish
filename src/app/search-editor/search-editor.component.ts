import { Component, OnInit, Input } from '@angular/core';

// import { Http, Response } from '@angular/http'; // ?????????? AJOUT ??
// import { catchError, map, tap } from 'rxjs/operators'; // ?????????? AJOUT ??


import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';



import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';


import { Fish } from '../fish';
// import { fishes } from '../in-memory-data.service';
import { PostsService} from '../posts.service';

// import { Data } from '@angular/router';
//  import { FISHES } from '../mock-fishes';

@Component({
  selector: 'app-search-editor',
  templateUrl: './search-editor.component.html',
  styleUrls: ['./search-editor.component.css'],
  providers: [
    PostsService,
  ],
})

export class SearchEditorComponent implements OnInit {

  //  data: any = {};
  //  data: any = [];

  namesp$: Observable<Fish[]>;
  private searchTerms = new Subject<string>();

  fishes: Fish[];
  editFish: Fish; // the fish currently being edited


// ************************************** */


  searchForm = this.fb.group({
    nameSpecie: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService
  ) {  }


  get nameSpecie() {
    return this.searchForm.get('nameSpecie') as FormArray;
  }
  addNameSpecie() {
    this.nameSpecie.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.searchForm.value);
  }


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    console.log('searchterm?????? :' + this.searchTerms);
  }

  ngOnInit(): void {
    this.namesp$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
      this.postsService.searchFishes(term)),
      //  this.postsService.getAllSpecies(term)),
      // switchMap((term: string) => this.nameSpecieService.searchNameSpecie(term)),
    );
    console.log('data$$$$$ :' + this.namesp$);
  }

}
