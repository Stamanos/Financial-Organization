import { Component, OnInit } from '@angular/core';
import { COSTS } from '../../mock-costs';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  cost: Object;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    let parameterId= this.route.snapshot.paramMap.get('id');
    this.cost = COSTS.filter(function(c){
      return c.id == parameterId;
    });
    this.cost = this.cost[0];
    console.log(this.cost);
  }

}
