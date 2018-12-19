import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    
  }

  takeFile(event){
    console.log(event);
  }

}
