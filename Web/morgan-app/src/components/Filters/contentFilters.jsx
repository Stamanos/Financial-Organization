import React, { Component } from 'react';
import Select from 'react-select';
import spendingItems from '../Json/costs.json';  //Json file

const input = ["type", "location", "amount"];
const options = createOption(input);

//#region MakeOptionList
function createOption(column){
    var uniqueValues = onlyUnique(column);
    const optionList = [];
    for(var i = 0; i < uniqueValues.length; i++){
        optionList.push({
            value: uniqueValues[i],
            label: uniqueValues[i]
        })
    }
    return optionList;
}

function onlyUnique(column) {
    return Array.from(new Set(filterBy(column)));
}

function filterBy(column){
    return spendingItems.map(i => {
        return i[`${column}`];
    })
}
//#endregion

class Filters extends Component {

    state = {
        selectedOption: null
    }
    handleChange  = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render() { 
        const { selectedOption } = this.state;

        return (
            <React.Fragment>
                <label>{input[1]}</label>
                <Select
                    value = {selectedOption}
                    onChange = {this.handleChange}
                    options = {createOption(input[1])}
                /> 
            </React.Fragment>
        );
    }
}
export default Filters;