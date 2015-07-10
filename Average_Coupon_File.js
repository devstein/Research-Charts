//main function
$.get('coupon_data.csv', function (data) {

    //set high level chart options
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });
    //set up chart 
    var options = {

        //set chart type
        chart: {
            type: 'spline',
            //set chart to its container
            renderTo: 'average_coupon_container'
        },
        //set title
        title: {
            text: 'Volume Weighted Average Coupon by Seasoning',
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
                text: 'Volume Weighted ( % )',
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
            enabled: true,
            layout: 'horizontal',
            align: 'center',
            borderWidth: 1,
            borderRadius: 5,
	    itemDistance: 15
        },
        //instantiate series
        series: [],
        //define series color scheme
        //set graph colors
        colors: [ '#002244', '#99BBDD', '#DBBB33','#FFEE66', '#83B354', '#55AA00', '#8254B0', '#5500AA'],

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
            filename: 'MarketAxess_average_coupon'
        },

        credits: {
            enabled: false
        }
    };
    //names of labels in order of series
    var names = ['HG New Issue', 'HG All', 'HY New Issue', 'HY All'];
    //get csv file, multiply by 100 and populate chart
    readCSV(options, data, 0.01, names);
    var chart = new Highcharts.Chart(options);
});