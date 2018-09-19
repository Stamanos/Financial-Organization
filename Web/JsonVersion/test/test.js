function test(){
    var ctx = document.getElementById('c').getContext('2d');
    var myChart = new Chart(ctx, {
       type: 'bar',
       data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' ,'September'],
          datasets: [{
             data: [259.33, 660.7, 555.23, 640.92, 473.3, 763.2, 861.52, 666.14, 531.3],
             backgroundColor: ['#30799f', '#ac51c3', '#4ba57b', '#e3297d', '#e35c32', '#ac51c3', '#4ba57b', '#e3297d', '#e35c32'],
             borderColor: ['#30799f', '#ac51c3', '#4ba57b', '#e3297d', '#e35c32', '#ac51c3', '#4ba57b', '#e3297d', '#e35c32'],
             borderWidth: 1
          }]
       },
       options: {
          responsive: false,
          scales: {
             xAxes: [{
                ticks: {
                   callback: function(t) {
                      var maxLabelLength = 3;
                      if (t.length > maxLabelLength) return t.substr(0, maxLabelLength) + '...';
                      else return t;
                   }
                }
             }],
             yAxes: [{
                ticks: {
                   beginAtZero: true,
                   stepSize: 1
                }
             }]
          },
          legend: {
             display: false
          },
          tooltips: {
             callbacks: {
                title: function(t, d) {
                   return d.labels[t[0].index];
                }
             }
          }
       }
    });
}
    