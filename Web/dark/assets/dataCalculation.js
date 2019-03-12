
//#region FilteringByDate ToDo:: Is in prosses

function dayOfYear(date){
    var now = new Date(date);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }
  
  function FiterByMonth(amountList){
    var fooData = {};
    amountList.forEach(function(element){
      console.log(dayOfYear(`${element.date}`));
      var dateArray = element.date.split('/');
      if(fooData[`${dateArray[0]}`] === undefined){ //if is the first amount of the month
        fooData[`${dateArray[0]}`] = element.amount;
      }else{
        fooData[`${dateArray[0]}`] += element.amount;
      }
    });
    console.log(fooData);
  
  }
  
  //#endregion