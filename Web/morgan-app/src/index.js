import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
// The importings below are working properly
// import {columnFilters} from './js/Filters/columnFilters.js';
// import {contentFilters} from './js/Filters/contentFilters.js';
// import {dayOfYear} from './js/Filters/dateFilter.js';
// import {createHTML} from './js/InnerHtml/selectionFilters.js';
//import {totalCost} from './js/InnerHtml/totalCost.js';
// import {daterangepicker} from './js/calendar.js';
// import {showChart} from './js/displayCharts.js';
// import {excelToJson} from './js/excelConverter.js';
// import {amountSlider} from './js/slider.js';

// 1) On window load -> Call createHtml() from selectionsFilters.js
// 2) Press OK -> 
// 3) 

const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
    sourceFile: './costs.xlsx'
});
console.log(result);

const element = <h1>Hello world</h1>;
console.log(element);
ReactDOM.render(element, document.getElementById('root'));


