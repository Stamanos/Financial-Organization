


var filterName = document.getElementById("something");



//#region Column Filtering
function columnFilters(spendingItems, column){
    $.getJSON("./Json/"+ column +".json", function(elements){
        const chartData = [];
        elements.forEach(i => {
            var temp = spendingItems.filter(function(s){
                return s[`${column}`] == i; //searching for costs that has this characteristic
            });
            var amount = temp.map(a => {
                return parseFloat(a[" amount "]); //collect the list of amounts
            });
            chartData.push(amount.reduce((a,b) => a + b, 0).toFixed(2)); //push the sum of it
            console.log(amount.reduce((a,b) => a + b, 0).toFixed(2));
        });
        var ctx = document.getElementById('canvas').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: elements,
                datasets: [{
                    data: chartData,
                    backgroundColor: '#30799f',
                    borderColor: '#30799f',
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
    });
  }
  //#endregion