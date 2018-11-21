import React from 'react';
import ReactDOM from 'react-dom';

//style
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.css';

import spendingItems from './components/Json/costs.json';  //Json file

//Javascript functions
import Filters from './components/Filters/contentFilters';
// import theNameOfTheFunction from './js/Filters/columnFilters';
// import theNameOfTheFunction from './js/Filters/dateFilter';
// import theNameOfTheFunction from './js/InnerHtml/selectionFilters';
// import theNameOfTheFunction from './js/InnerHtml/totalCost';
// import theNameOfTheFunction from './js/calendar';
// import theNameOfTheFunction from './js/displayCharts';
// import theNameOfTheFunction from './js/slider';

ReactDOM.render(<Filters />, document.getElementById("root"));

console.log(onlyUnique("type"));

function onlyUnique(column) { 
    return Array.from(new Set(filterBy(column)));
}

function filterBy(column){
    return spendingItems.map(i => {
        return i[`${column}`];
    });
}

