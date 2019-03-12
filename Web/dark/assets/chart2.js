var optionsCircle4 = {
    chart: {
      type: 'radialBar',
      width: 380,
      height: 360,
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: true,
        hollow: {
          margin: 5,
          size: '48%',
          background: 'transparent',
  
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180
  
      },
    },
    stroke: {
      lineCap: 'round'
    },
    series: [71, 63, 77],
    labels: ['June', 'May', 'April'],
    legend: {
      show: true,
      floating: true,
      position: 'right',
      offsetX: 70,
      offsetY: 240
    },
  }