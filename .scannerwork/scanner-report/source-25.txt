import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MainAuthService } from '../../todo-component/forms/main-auth/main-auth.service';
import { NavlinksService } from '../../shared/todo-service/navlinks.service';

@Component({
  selector: 'app-medium-header',
  templateUrl: './medium-header.component.html',
  styleUrls: ['./medium-header.component.scss']
})

export class MediumHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private mainAuthService: MainAuthService,
    private navlinksService: NavlinksService,
  ) { }

  ngOnInit() { }

  ScrollToMainDiv() {

    const myAnchor: string = 'gallery';

    this.navlinksService.ScrollTo(myAnchor);
  }

  ScrollToAboutDiv() {

    const myAnchor: string = 'medium-about';

    this.navlinksService.ScrollTo(myAnchor);
  }

}
