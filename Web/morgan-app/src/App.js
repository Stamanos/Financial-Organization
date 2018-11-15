import React, { Component } from 'react';
import Calendar, { daterangepicker } from './Calendar';
import Slider, { amountSlider } from './Slider';
import SelectionFilters, { createHTML } from './InnerHtml/SelectionFilters';
import TotalCost, { totalCost } from './InnerHtml/TotalCost';
import ColumnFilters, { columnFilters } from './Filters/ColumnFilters';
import ContentFilters, { contentFilters } from './Filters/ContentFilters';
import DisplayCharts, { showChart } from './DisplayCharts';
import ExcelConverter, { excelToJson } from './ExcelConverter';
import DateFilter, { filterByDate } from './Filters/DateFilter';

//let spendingItems, startDate, endDate, startAmount, endAmount, excelColumns;



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
