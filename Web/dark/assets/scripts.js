window.Apex = {
  chart: {
    foreColor: '#ccc',
    toolbar: {
      show: false
    },
  },
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    theme: 'dark'
  },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: {
        show: true
      }
    }
  }
};

var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom'), optionsCircle4);
var chartBar = new ApexCharts(document.querySelector("#barchart"), optionsBar);
var chartArea = new ApexCharts(document.querySelector("#areachart"), optionsArea);

chartLine.render();
chartCircle4.render();
chartBar.render();
chartArea.render();