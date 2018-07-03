const spendingItems = [
    {ammount : 20, type : "transportation", date : "1/20/2018", description : "Βενζίνη / Μπριτζ πατέρα", userSituation : "in relationship", phycologyLevel : 5, region : "Peristeri"},
    {ammount : 10, type : "beauty", date : "1/20/2018", description : "κούρεμα", userSituation : "in relationship", phycologyLevel : 5, region : "Peristeri"},
    {ammount : 100, type : "help", date : "1/20/2018", description : "Θείας Λίτσας", userSituation : "in relationship", phycologyLevel : 5, region : "Peristeri"},
    {ammount : 10, type : "food", date : "1/20/2018", description : "Πίτσα με Μιχάλη", userSituation : "in relationship", phycologyLevel : 5, region : "New Irakleion"},
    {ammount : 50, type : "beauty", date : "1/21/2018", description : "κούρεμα Χαρούλας", userSituation : "in relationship", phycologyLevel : 5, region : "Peristeri"}
];

const typesOfSpending = ['help', 'staying', 'clothing', 'transportation', 'beauty', 'material', 'obligation', 'food-drink'];
const typeOfChart = ['column', "bar", 'area', 'line', 'pie'];

window.onload = function () {
    var chartAmmount = new CanvasJS.Chart("chartContainer", {

      title:{
        text: "Ammount of money has been spend"              
      },
      data: [//array of dataSeries              
        { //dataSeries object

         type: typeOfChart[1],
         //dataPoints : spendingItems.map((items: any[]) => items.filter(item => item.region == "Peristeri"))
         dataPoints : spendingItems.map(i => {
            return {label: i.description, y: i.ammount};
         })
         }
       ]
     });

    chartAmmount.render();
  }

