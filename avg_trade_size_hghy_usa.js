//create all crossable bonds by cusip chart
function all_crossable_cusip_chart() {
    //var to catch any issues while getting data 
    var jqxhr_all_crossable_cusip = $.get('../../datafiles/widget/avg_trade_size_usa.csv', function (data) {
        var options = {
            //chart options 
            chart: {
                //set type of graph, where it renders
                type: 'line',
                renderTo: 'avg_trade_size_usa_container'
            },
            //set title of graph
            title: {
                text: 'TRACE Average Trade Size',
                style: {
                    color: '#4D759E'
                },
                align: 'center'
            },
            //set xAxis title
            xAxis: {
                title: {
                    text: 'Date',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                }
            },
            //set yAxis info 
            yAxis: {
                title: {
                    text: 'TRACE Average Trade Size ( Thousands USD )',
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
                },
                //set y-axis to the left side
                opposite: false,
                //set background grid line width
                gridLineWidth: 1
            },
            //stylize the tooltip 
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                valuePrefix: '$',
                valueDecimals: 2
            },
            //enable and stylize the legend
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                borderWidth: 1,
                borderRadius: 5,
                itemDistance: 20,
                reversed: false
            },
            //set the starting range. 0-5. 5="All", 4="1yr", etc
            rangeSelector: {
                selected: 4,
                allButtonsEnabled: true
            },
            //set general plot options 
            plotOptions: {
                series: {
                    turboThreshold: 0
                }
            },
            //disable credits
            credits: {
                enabled: false
            },
            //make download as csv format correctly
            navigator: {
                series: {
                    includeInCSVExport: false
                }
            },
            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_avg_trade_size_usa',
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
            //set graph colors
            colors: ['#002244', '#99BBDD', '#DBBB33', '#FFEE66', '#83B354', '#55AA00', '#8254B0', '#5500AA'],
            //series to be filled by data 
            series: []
        };
        //names of labels in order of series. make sure they are the same as series header in data file
        var names = ['HG','HG &gt; 100K', 'HY', 'HY &gt; 100K'];
        //get csv file, multiply by 100 (divide by .01) and populate chart
        readCSV(options, data, 1000, names);
        var chart = new Highcharts.StockChart(options);

    })
        //catch and display any errors 
        .fail(function (jqxhr_all_crossable_cusip, exception) {
            ajaxError(jqxhr_all_crossable_cusip, exception, '#avg_trade_size_usa_container');
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
    all_crossable_cusip_chart();
    $('#avg_trade_size_usa_container').toggle(true);
    all_crossable_volume_chart();
    auto_assign_toggle_chart_buttons();
})();