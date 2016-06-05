//create debt_outstanding chart
function debt_outstanding_chart() {
    //var to catch any issues while getting data 
    var jqxhr_debt_outstanding = $.get('../../datafiles/widget_data/debt_outstanding.csv', function (data) {
        //set up chart 
        var options = {
            //set chart type
            chart: {
                type: 'spline',
                renderTo: 'debt_outstanding_container'
            },
            //set title 
            title: {
                text: 'Corporate Debt Outstanding',
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
                //must set datetime for dates to be on the x-axis
                type: 'datetime'
            },
            //set y-axis 
            yAxis: {
                title: {
                    text: 'Corporate Debt Outstanding ( Billions USD )',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    //give y-axis labels commas for thousands place seperator
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0, '', ',');
                    }
                }
            },
            //set tooltip       
            tooltip: {
                valuePrefix: '$',
                valueSuffix: ' Billion',
				valueDecimals: 2,
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            },
            //set legend
            legend: {
                layout: 'horizontal',
                align: 'center',
                borderWidth: 1,
                borderRadius: 5
            },
            //instantiate series
            series: [],
            //set colors for series
            colors: ['#002244', '#DBBB33'],
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
                filename: 'MarketAxess_debt_outstanding',
                //enable download icon
                enabled: true,
                //add image to chart download 
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

            credits: {
                enabled: false
            }
        };
        //names of labels in order of series
        var names = ['High Grade', 'High Yield'];
        //get csv file, divide by 1 billion and populate chart
        readCSV(options, data, 1000000000, names);
        var chart = new Highcharts.Chart(options);
    })
        //display error on failure to read data 
        .fail(function (jqxhr_debt_outstanding, exception) {
        ajaxError(jqxhr_debt_outstanding, exception, '#debt_outstanding_container');
    });

}

(function () {

    //set high level chart options for all charts
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    debt_outstanding_chart();
})();