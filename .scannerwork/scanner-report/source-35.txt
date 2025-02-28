import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MainAuthService } from '../../todo-component/forms/main-auth/main-auth.service';
import { NavlinksService } from '../../shared/todo-service/navlinks.service';

@Component({
  selector: 'app-xs-header',
  templateUrl: './xs-header.component.html',
  styleUrls: ['./xs-header.component.scss']
})
export class XsHeaderComponent implements OnInit {

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

    const myAnchor: string = 'xsmall-about';

    this.navlinksService.ScrollTo(myAnchor);
  }

}
