//create trade count by size high grade chart 
function by_size_abs_count_hg_chart() {
    //variable to catch any issues getting data
    var jqxhr_hg_abs_count = $.get('../../datafiles/widget_data/abs_trade_count_by_size_hg.csv', function (data) {

            //set up chart 
            var options = {
                //set chart type
                chart: {
                    type: 'column',
                    renderTo: 'by_size_abs_count_hg_container',
                    alignTicks: false
                },
                //set title 
                title: {
                    text: 'TRACE High Grade Trade Count',
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
                    //set datetime for x-axis with dates
                    type: 'datetime',
                    //make date labels vertical
                    labels: {
                        rotation: -90,
                        align: 'right',
                        y: 11
                    }
                },
                //set y-axis 
                yAxis: {
                    title: {
                        text: 'TRACE High Grade Trade Count',
                        style: {
                            color: '#4D759E',
                            fontWeight: 'bold'
                        }
                    },
                    labels: {
                        //format y-axis label with thousands place seperator 
                        formatter: function () {
                            return Highcharts.numberFormat(this.value, 0, '', ',');
                        }
                    },
                    //keep stacks in order of series 
                    reversedStacks: false,
                    //set y-axis to the left side
                    opposite: false
                },
                //set the starting range. 0-5. 5="All", 4="1yr", etc
                rangeSelector: {
                    selected: 4,
                    allButtonsEnabled: true
                },
                //set tooltip       
                tooltip: {
                    valueDecimals: 0,
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
                },
                //set legend
                legend: {
                    enabled: true,
                    layout: 'horizontal',
                    align: 'center',
                    borderWidth: 1,
                    borderRadius: 5
                },
                //set colors for series
                colors: ['#43C5F3', '#DBBB33', '#002244', '#639741'],
                //set general plot options
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0,
                        stacking: 'normal'
                    }
                },
                //make download as csv format correctly
                navigator: {
                    series: {
                        includeInCSVExport: false,
                        turboThreshold: 0
                    }
                },
                //instantiate series
                series: [],
                //set name of chart downloads
                exporting: {
                    filename: 'MarketAxess_hg_trade_count_by_size',
                    //enable download icon
                    enabled: true,
                    //change chart options for download
                    chartOptions: {
                        //add image to download 
                        chart: {
                            events: {
                                load: function () {
                                    this.renderer.image('http://www.marketaxess.com/images/marketaxess_logo2.gif', 90, 75, 300, 48).attr({
                                        opacity: 0.1
                                        }).add();
                                }
                            },
                        },
                        //remove scrollbar and navigator from downloaded image
                        scrollbar: {
                            enabled: false
                        },
                        navigator:{
                            enabled: false
                        }
                    },
                    //make download as csv format correctly
                    csv: {
                        dateFormat: '%Y-%m-%d'
                    }
                },
                //disable credits
                credits: {
                    enabled: false
                }
            };
            //names of labels in order of series
            var names = ['&lt; $100K','$100K - &lt; $1MM', '$1MM - $5MM', '$5MM+ (Using Avg. Capped Amt.)'];
            //get csv file divide by 1 (no change to data) and populate chart
            readCSV(options, data, 1, names);
            var chart = new Highcharts.StockChart(options);
            //had to add for some reason otherwise navigator would not show a line unless a series was toggled
            chart.series[0].hide();
            chart.series[0].show();
        })
        //catch error and display them
        .fail(function (jqxhr_hg_abs_count, exception) {
            ajaxError(jqxhr_hg_abs_count, exception, '#by_size_abs_count_hg_container');
    });

}
//create trade count share high grade chart
function by_size_trade_share_hg_chart() {
    //variable to catch any issues getting data
    var jqxhr_hg_count_share = $.get('../../datafiles/widget_data/trade_share_by_size_hg.csv', function (data) {

            //set up chart 
            var options = {
                //set chart type
                chart: {
                    type: 'column',
                    renderTo: 'by_size_trade_share_hg_container',
                    alignTicks: false
                },
                //set title 
                title: {
                    text: 'TRACE High Grade Trade Count Share',
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
                    type: 'datetime',
                    //make x-axis labels vertical
                    labels: {
                        rotation: -90,
                        align: 'right',
                        y: 11
                    }
                },
                //set y-axis 
                yAxis: {
                    title: {
                        text: 'TRACE High Grade Trade Count Share ( % )',
                        style: {
                            color: '#4D759E',
                            fontWeight: 'bold'
                        }
                    },
                    labels: {
                        //add percent to y-axis labels
                        formatter: function () {
                            return this.value + '%';
                        }
                    },
                    //make from 0% to 100%
                    max: 100,
                    reversedStacks: false,
                    showLastLabel: true,
                    //set y-axis to the left side
                    opposite: false
                },
                //set the starting range. 0-5. 5="All", 4="1yr", etc
                rangeSelector: {
                    selected: 4,
                    allButtonsEnabled: true
                },
                //set tooltip       
                tooltip: {
                    valueSuffix: '%',
                    valueDecimals: 2,
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
                },
                //set legend
                legend: {
                    enabled: true,
                    layout: 'horizontal',
                    align: 'center',
                    borderWidth: 1,
                    borderRadius: 5
                },
                //instantiate series
                series: [],
                //set colors for series
                colors: ['#43C5F3', '#DBBB33', '#002244', '#639741'],
                //set general plot options
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0,
                        stacking: 'normal'
                    }
                },
                //make download as csv format correctly
                navigator: {
                    series: {
                        includeInCSVExport: false,
                        turboThreshold: 0
                    }
                },
                //set name of chart downloads
                exporting: {
                    filename: 'MarketAxess_hg_trade_share_by_size',
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
                        },
                        //remove scrollbar and navigator from downloaded image
                        scrollbar: {
                            enabled: false
                        },
                        navigator:{
                            enabled: false
                        }
                    },
                    //make download as csv format correctly
                    csv: {
                        dateFormat: '%Y-%m-%d'
                    }
                },
                //disable credits
                credits: {
                    enabled: false
                }
            };
            //names of labels in order of series
            var names = ['&lt; $100K','$100K - &lt; $1MM', '$1MM - $5MM', '$5MM+ (Using Avg. Capped Amt.)'];
            //get csv file multiply by 100 (divide .01) and populate chart
            readCSV(options, data, 0.01, names);
            var chart = new Highcharts.StockChart(options);
            //had to add for some reason otherwise navigator would not show a line unless a series was toggled
            chart.series[0].hide();
            chart.series[0].show();
        })
        //catch and display any errors parsing data 
        .fail(function (jqxhr_hg_count_share, exception) {
            ajaxError(jqxhr_hg_count_share, exception, '#by_size_trade_share_hg_container');
    });
}
//create high grade volume count by size chart
function by_size_abs_volume_hg_chart() {
    //catch any errors getting data
    var jqxhr_hg_abs_volume = $.get('../../datafiles/widget_data/abs_volume_count_by_size_hg.csv', function (data) {

        //set up chart 
        var options = {
            //set chart type
            chart: {
                type: 'column',
                renderTo: 'by_size_abs_volume_hg_container',
                alignTicks: false,
            },
            //set title 
            title: {
                text: 'TRACE High Grade Trade Volume',
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
                //datetime must be set to have dates on x-axis 
                type: 'datetime',
                //make labels vertical
                labels: {
                    rotation: -90,
                    align: 'right',
                    y: 11
                }
            },
            //set y-axis 
            yAxis: {
                title: {
                    text: 'TRACE High Grade Trade Volume ( Billions USD )',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    //thousands place comma seperator 
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0, '', ',');
                    }
                },
                reversedStacks: false,
                //set y-axis to the left side
                opposite: false
            },
            //set the starting range. 0-5. 5="All", 4="1yr", etc
            rangeSelector: {
                selected: 4,
                allButtonsEnabled: true
            },
            //set tooltip       
            tooltip: {
                valueDecimals: 0,
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            },
            //set legend
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                borderWidth: 1,
                borderRadius: 5
            },
            //instantiate series
            series: [],
            //set colors for series
            colors: ['#43C5F3', '#DBBB33', '#002244', '#639741'],
            //set general plot options
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    stacking: 'normal'
                }
            },
            //make download as csv format correctly
            navigator: {
                series: {
                    includeInCSVExport: false,
                    turboThreshold: 0
                }
            },
            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_by_size_abs_volume_hg',
                //download icon enabled
                enabled: true,
                //add image to downloads
                chartOptions: {
                    chart: {
                        events: {
                            load: function () {
                                this.renderer.image('http://www.marketaxess.com/images/marketaxess_logo2.gif', 90, 75, 300, 48).attr({
                                    opacity: 0.1
                                    }).add();
                            }
                        }
                    },
                    //remove scrollbar and navigator from downloaded image
                    scrollbar: {
                        enabled: false
                    },
                    navigator:{
                        enabled: false
                    }
                },
                //make download as csv format correctly
                csv: {
                    dateFormat: '%Y-%m-%d'
                }
            },
            //disable credits
            credits: {
                enabled: false
            }
        };
        //names of labels in order of series
            var names = ['&lt; $100K','$100K - &lt; $1MM', '$1MM - $5MM', '$5MM+ (Using Avg. Capped Amt.)'];
        //get csv file, divide by 1 billion and populate chart
        readCSV(options, data, 1000000000, names);
        var chart = new Highcharts.StockChart(options);
        //had to add for some reason otherwise navigator would not show a line unless a series was toggled
        chart.series[0].hide();
        chart.series[0].show();
    })
        //catch and display errors 
        .fail(function (jqxhr_hg_abs_volume, exception) {
            ajaxError(jqxhr_hg_abs_volume, exception, '#by_size_abs_volume_hg_container');
    });

}
//create high grade volume share by size chart
function by_size_volume_share_hg_chart() {
    //variable to catch errors getting data
    var jqxhr_hg_volume_share = $.get('../../datafiles/widget_data/volume_share_by_size_hg.csv', function (data) {

        //set up chart 
        var options = {
            //set chart type
            chart: {
                type: 'column',
                renderTo: 'by_size_volume_share_hg_container',
                alignTicks: false
            },
            //set title 
            title: {
                text: 'TRACE High Grade Trade Volume Share',
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
                //datetime must be set to have dates on x-axis 
                type: 'datetime',
                //make axis labels vertical 
                labels: {
                    rotation: -90,
                    align: 'right',
                    y: 11
                }
            },
            //set y-axis 
            yAxis: {
                title: {
                    text: 'TRACE High Grade Trade Volume Share ( % )',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    //make y-axis labels %s
                    formatter: function () {
                        return this.value + '%';
                    }
                },
                //make graph out of 100%
                max: 100,
                showLastLabel: true,
                reversedStacks: false,
                //set y-axis to the left side
                opposite: false
            },
            //set the starting range. 0-5. 5="All", 4="1yr", etc
            rangeSelector: {
                selected: 4,
                allButtonsEnabled: true
            },
            //set tooltip       
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 2,
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            },
            //set legend
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                borderWidth: 1,
                borderRadius: 5
            },
            //instantiate series
            series: [],
            //set colors for series
            colors: ['#43C5F3', '#DBBB33', '#002244', '#639741'],
            //set general plot options
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    stacking: 'normal'
                }
            },
            //make download as csv format correctly
            navigator: {
                series: {
                    includeInCSVExport: false,
                    turboThreshold: 0
                }
            },
            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_by_size_volume_share_hg',
                //enable icon download 
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
                    },
                    //remove scrollbar and navigator from downloaded image
                    scrollbar: {
                        enabled: false
                    },
                    navigator:{
                        enabled: false
                    }
                },
                //make download as csv format correctly
                csv: {
                    dateFormat: '%Y-%m-%d'
                }
            },
            //disable credits 
            credits: {
                enabled: false
            }
        };
        //names of labels in order of series
            var names = ['&lt; $100K','$100K - &lt; $1MM', '$1MM - $5MM', '$5MM+ (Using Avg. Capped Amt.)'];
        //get csv file, multiply by 100 (divide by .01) and populate chart
        readCSV(options, data, 0.01, names);
        var chart = new Highcharts.StockChart(options);
        //had to add for some reason otherwise navigator would not show a line unless a series was toggled
        chart.series[0].hide();
        chart.series[0].show();
    })
        //catch and display any errors 
        .fail(function (jqxhr_hg_volume_share, exception) {
            ajaxError(jqxhr_hg_volume_share, exception, '#by_size_volume_share_hg_container');
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
    by_size_abs_count_hg_chart();
    $('#by_size_abs_count_hg_container').toggle(true);
    by_size_trade_share_hg_chart();
    by_size_abs_volume_hg_chart();
    by_size_volume_share_hg_chart();
    auto_assign_toggle_chart_buttons();
})();