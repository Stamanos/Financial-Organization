var fs = require('fs');
var data = fs.readFileSync('costs.json');
for(var cost in data){
    var costParsed = JSON.parse(cost);
    console.log(costParsed);
}


// $(jQuery.parseJSON(costs)).array.forEach(element => {
//     console.log(element);
// });