function showChart(chartDataPoints, chartTitle) {
    var chartamount = new CanvasJS.Chart("chartContainer", {
      title:{
        text: chartTitle   
      },
      data: [             
        {
         type: document.getElementById("typeOfChartSelection").value,
         dataPoints : chartDataPoints
         }
       ],
     });
    chartamount.render();
  }