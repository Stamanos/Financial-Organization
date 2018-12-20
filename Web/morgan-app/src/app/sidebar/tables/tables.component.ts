import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { COSTS } from '../../mock-costs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  users$: Object;
  costs = COSTS;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users$ = data
    )
  }

}
