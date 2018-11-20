import React, { Component } from 'react';

class Filters extends Component {
    state = { 
        columns: ['amount', 'type', 'date', 'description', 'userStatus', 'moodLevel', 'location'],
        amount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        type: [],
        date: [],
        description: [],
        userStatus: [],
        moodLevel: [],
        location: []
     }
    render() { 
        return (
            <React.Fragment>
                <label>{this.state.columns[1]}</label>
                <select idName={this.state.columns[1] + "Selection"}>
                    <option>{this.state.amount}</option>
                </select>
            </React.Fragment>
        );
    }
}
 
export default Filters;