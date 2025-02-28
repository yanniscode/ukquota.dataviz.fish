import { Component, OnInit } from '@angular/core';

import { NavlinksService } from '../../shared/todo-service/navlinks.service';

@Component({
  selector: 'app-medium-footer',
  templateUrl: './medium-footer.component.html',
  styleUrls: ['./medium-footer.component.scss']
})
export class MediumFooterComponent implements OnInit {

  constructor(
    private navlinksService: NavlinksService,
  ) { }

  ngOnInit() { }


  ScrollToTop() {

    const myAnchor: string = 'medium-header';

    this.navlinksService.ScrollTo(myAnchor);

  }

}
