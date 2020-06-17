
var optionsBar = {
    chart: {
      height: 380,
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        horizontal: false,
      },
    },
    series: [{
      name: 'PRODUCT A',
      data: [14, 25, 21, 17, 12, 13, 11, 19]
    }, {
      name: 'PRODUCT B',
      data: [13, 23, 20, 8, 13, 27, 33, 12]
    }, {
      name: 'PRODUCT C',
      data: [11, 17, 15, 15, 21, 14, 15, 13]
    }],
    xaxis: {
      categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
    },
    fill: {
      opacity: 1
    },
  
  }