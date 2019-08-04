import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../todo-data-service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { } // Modify the constructor with a parameter that declares a public
  // messageService property. Angular will inject the singleton MessageService into that property when it creates the
  // MessagesComponent.
  //  The messageService property must be public because you're about to bind to it in the template.

  ngOnInit() {
  }

}