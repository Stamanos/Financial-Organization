import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  constructor() { }

  countries:{
    name: string,
    id: string
  };

  ngOnInit() {
    
  }

  takeFile(event){
    console.log(event);
  }

}
