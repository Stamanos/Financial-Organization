import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CostTableDataSource } from './cost-table-datasource';

@Component({
  selector: 'app-cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.css']
})
export class CostTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CostTableDataSource;

  displayedColumns = ['id', 'amount', 'date', 'description', 'location', 'moodLevel', 'type', 'userStatus'];
  
  ngOnInit() {
    this.dataSource = new CostTableDataSource(this.paginator, this.sort);
  }
}
