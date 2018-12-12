import { Component, OnInit } from '@angular/core';
import { COSTS } from '../../mock-costs';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  costs = COSTS;
  constructor() { }

  ngOnInit() {
  }

}
