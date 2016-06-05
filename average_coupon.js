//function to create average coupong chart
function average_coupon_chart() {
    //create variable to catch any errors in reading the data
    var jqxhr_average_coupon = $.get('../../datafiles/widget_data/avg_coupon.csv', function (data) {
        //set up chart options
        var options = {

            //set chart type
            chart: {
                type: 'spline',
                //set chart to its container
                renderTo: 'average_coupon_container'
            },
            //set title
            title: {
                text: 'TRACE Volume-Weighted Average Fixed-Rate Coupon',
                style: {
                    color: '#4D759E'
                },
                align: 'center'
            },
            //set x-axis
            xAxis: {
                title: {
                    text: 'Date',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                },
                gridLineWidth: 1,
                //must set datetime as x-axis label
                type: 'datetime'
            },
            //set y-axis
            yAxis: {
                title: {
                    text: 'TRACE Volume-Weighted Average Fixed-Rate Coupon ( % )',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                },
                //make y-axis labels percents
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },
            //set tooltip
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 2,
                //make series display pretty
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            },
            //set legend
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                borderWidth: 1,
                borderRadius: 5,
                itemDistance: 15
            },
            //instantiate series
            series: [],
            //define series color scheme. colors used in same order of series array 
            colors: ['#002244', '#99BBDD', '#DBBB33', '#FFEE66', '#83B354', '#55AA00', '#8254B0', '#5500AA'],

            //set general plot options
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    turboThreshold: 0
                }
            },

            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_average_coupon',
                //allow download icon in top right of chart
                enabled: true,
                //add image to downloaded content
                chartOptions: {
                    chart: {
                        events: {
                            load: function () {
                                this.renderer.image('http://www.marketaxess.com/images/marketaxess_logo2.gif', 90, 75, 300, 48).attr({
                                    opacity: 0.1
                                    }).add();
                            }
                        }
                    }
                }
            },
            //disable credits
            credits: {
                enabled: false
            }
        };
        //names of labels in order of series. Make sure they align with csv file
        var names = ['High Grade', 'High Grade New Issues', 'High Yield', 'High Yield New Issues'];
        //get csv file, multiply by 100 and populate chart
        readCSV(options, data, 0.01, names);
        var chart = new Highcharts.Chart(options);
    })
        //if shit hits the wall call the error function and display an error message in the chart
        .fail(function (jqxhr_average_coupon, exception) {
            ajaxError(jqxhr_average_coupon, exception, '#average_coupon_container');
    });
}

(function () {

    //set high level chart options for all charts
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    average_coupon_chart();
})();