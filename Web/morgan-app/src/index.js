import React from 'react';
import ReactDOM from 'react-dom';

//style
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.css';

import spendingItems from './Json/costs.json';  //Json file

//Javascript functions
import {contentFilters} from './js/Filters/contentFilters.js';
import {columnFilters} from './js/Filters/columnFilters.js';
import {dayOfYear} from './js/Filters/dateFilter.js';
import {createHTML} from './js/InnerHtml/selectionFilters.js';
import {totalCost} from './js/InnerHtml/totalCost.js';
import {daterangepicker} from './js/calendar.js';
import {showChart} from './js/displayCharts.js';
import {amountSlider} from './js/slider.js';

ReactDOM.render(<Counter />, document.getElementById("root"));
// 1) On window load -> Call createHtml() from selectionsFilters.js
// 2) Press OK -> 
// 3) 



console.log(spendingItems);



