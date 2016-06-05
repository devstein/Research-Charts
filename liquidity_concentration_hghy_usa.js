//create liquidity concentration chart for high grade and high yield in USA
function liquidity_concentration_hghy_usa_chart() {
    //var to catch any issues while getting data 
    var jqxhr_liqudity_concentration_hghy_usa = $.get('../../datafiles/widget_data/liquidity_concentration_hghy_usa.csv', function (data) {
        //set up chart 
		
        var options = {
            //set chart type
            chart: {
                type: 'line',
                //set chart to its container
                renderTo: 'liquidity_concentration_hghy_usa_container'
            },
            //set title
            title: {
                text: 'TRACE Liquidity Concentration',
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
                type: 'datetime'
            },
            //set y-axis
            yAxis: {
                title: {
                    text: 'TRACE Liquidity Concentration ( % )',
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
            //define series color scheme
            colors: ['#002244', '#DBBB33', '#639741', '#43C5F3'],
            //set general plot options
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                line: {
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
                filename: 'MarketAxess_liquidity_concentration_usa',
                //enable download icon 
                enabled: true,
                //add image to download
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
        //names of labels in order of series
        var names = ['HG Volume %', 'HY Volume %'];
        //get csv file, multiply by 100 (divide by .01) and populate chart
        readCSV(options, data, 0.01, names);
        var chart = new Highcharts.Chart(options);
    })
        //if errors while gettting data, display them
        .fail(function (jqxhr_liqudity_concentration_hghy_usa, exception) {
            ajaxError(jqxhr_liqudity_concentration_hghy_usa, exception, '#liquidity_concentration_hghy_usa_container');
    });
}

(function () {

    //set high level chart options for all charts
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    liquidity_concentration_hghy_usa_chart();
})();