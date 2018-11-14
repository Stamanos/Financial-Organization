export function totalCost(amountList){
    var sum = amountList.reduce((a,b) => a + b, 0).toFixed(2); //sum
  
    if(amountList.length > 0){ //average
      var average = sum/amountList.length;
    }else{
      var average = 0;
    }
  
    $('#totalCost').empty(); //clean the previous if exists!
    var myDiv = document.getElementById("totalCost");
    var h2Total = document.createElement("h2");
    h2Total.textContent = "Total cost: " + sum.toString();
    myDiv.appendChild(h2Total);
    myDiv.appendChild(document.createElement("br"));
    var h2Average = document.createElement("h2");
    h2Average.textContent = "Average: " + average.toString();
    myDiv.appendChild(h2Average);
  }