var optionsLine = {
    chart: {
      height: 360,
      type: 'line',
      zoom: {
        enabled: false
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    //colors: ["#3F51B5", '#2196F3'],
    series: [{
        name: "Music",
        data: [1, 15, 26, 20, 33, 27]
      },
      {
        name: "Photos",
        data: [3, 33, 21, 42, 19, 32]
      },
      {
        name: "Files",
        data: [0, 39, 52, 11, 29, 43]
      }
    ],
    title: {
      text: 'Media',
      align: 'left',
      offsetY: 25,
      offsetX: 20
    },
    subtitle: {
      text: 'Statistics',
      offsetY: 55,
      offsetX: 20
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9
      }
    },
    grid: {
      show: true
    },
    labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
    xaxis: {
      tooltip: {
        enabled: false
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20
    }
  }
  
