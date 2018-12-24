import { Component, OnInit } from '@angular/core';
import { NOTIFICATIONS } from './../../mock-notifications';

@Component({
  selector: 'app-icon-cards',
  templateUrl: './icon-cards.component.html',
  styleUrls: ['./icon-cards.component.css']
})
export class IconCardsComponent implements OnInit {

  constructor() { }

  notifications = NOTIFICATIONS;
  ngOnInit() {
  }

}
