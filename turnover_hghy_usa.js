//create high grade turnover for USA chart 
function turnover_hg_usa_chart() {
    //var to record any errors while getting data
    var jqxhr_turnover_hg_usa = $.get('../../datafiles/widget/rolling_turnover_hg_usa.csv', function (data) {
        //set up chart 
        var options = {
            //set chart type
            chart: {
                type: 'spline',
                //set chart to its container
                renderTo: 'turnover_hg_usa_container'
            },
            //set title
            title: {
                text: 'TRACE High Grade Turnover (Trailing 12 Months)',
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
                //need datetime to display dates on x-axis
                type: 'datetime'
            },
            //set y-axis
            yAxis: {
                title: {
                    text: 'TRACE High Grade Turnover (Trailing 12 Months) ( % )',
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
                }
            },
            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_rolling_turnover_hg_usa',
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
        var names = ['All', 'Top 1000 CUSIPs by Volume', 'Ex-Top 1000 CUSIPs'];
        //get csv file, multiply by 100 (diviide by 0.01) and populate chart
        readCSV(options, data, 0.01, names);
        var chart = new Highcharts.Chart(options);
    })
        //if cannot get data display errors
        .fail(function (jqxhr_turnover_hg_usa, exception) {
            ajaxError(jqxhr_turnover_hg_usa, exception, '#turnover_hg_usa_container');
    });
}
//create turnover high yield usa chart
function turnover_hy_usa_chart() {
    //var to record any errors while getting data
    var jqxhr_turnover_hy_usa = $.get('../../datafiles/widget/rolling_turnover_hy_usa.csv', function (data) {
        //set up chart 
        var options = {
            //set chart type
            chart: {
                type: 'spline',
                //set chart to its container
                renderTo: 'turnover_hy_usa_container'
            },
            //set title
            title: {
                text: 'TRACE High Yield Turnover (Trailing 12 Months)',
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
                //need datetime for date on x-axis
                type: 'datetime'
            },
            //set y-axis
            yAxis: {
                title: {
                    text: 'TRACE High Yield Turnover (Trailing 12 Months) ( % )',
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
                series: {
                    turboThreshold: 0
                }
            },
            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_rolling_turnover_hy_usa',
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
            //disable credits
            credits: {
                enabled: false
            }
        };
        //names of labels in order of series
        var names = ['All', 'Top 500 CUSIPs', 'Ex-Top 500 CUSIPs'];
        //get csv file, multiply by 100 (divide by .01) and populate chart
        readCSV(options, data, 0.01, names);
        var chart = new Highcharts.Chart(options);
    })
        //if date parse fails display error
        .fail(function (jqxhr_turnover_hy_usa, exception) {
            ajaxError(jqxhr_turnover_hy_usa, exception, '#turnover_hy_usa_container');
    });
}

(function () {

    //set high level chart options for all charts
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    $('.chart_container').toggle(false);
    turnover_hg_usa_chart();
    $('#turnover_hg_usa_container').toggle(true);
    turnover_hy_usa_chart();
    auto_assign_toggle_chart_buttons();
})();