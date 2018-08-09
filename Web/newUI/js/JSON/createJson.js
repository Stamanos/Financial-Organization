var fs = require('fs');

//-----------------------JSON object----------------------------
var tempCost = {
    ammount: 3.5,
    type: "food-drink",
    date: "8/8/2018",
    description: "Ντάκος",
    userStatus: "inRelationship"
};
var dictsrting = JSON.stringify(tempCost);
//----------------------End of JSON object-------------------------

var data = fs.readFileSync('costs.json');
var costs = JSON.parse(data);

fs.writeFile('costs.json', dictsrting, finished);
function finished(err){
    console.log('Fuck yeah you did it!');
}

console.log(costs);