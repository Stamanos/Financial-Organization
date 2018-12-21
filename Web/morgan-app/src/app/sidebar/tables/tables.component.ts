import { Component, OnInit } from '@angular/core';
import { COSTS } from '../../mock-costs';
import { Observable } from 'rxjs';

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
