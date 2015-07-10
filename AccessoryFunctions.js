//function that iterates through all values and divides it by the 'scale' amount
function scaleValues(data, scale) {
    //scale cannot be less than 1 
    if (scale > 0) {
        $.each(data, function (index, point) {
            if (point.y > 0) {
                var newValue = point.y / scale;
                point.update(newValue);
            }
        });
    }
}



//function to parse, scale and add data from csv file
function readCSV(options, data, scale, names) {
    //split csv by lines
    var allLines = data.split('\n');
    //iterate through each line
    $.each(allLines, function (lineNo, line) {
        var items = line.split(',');
        //set names of data
        if (lineNo === 0) {
            //make sure series is defined 
            options.series = [];
            //loop through first line to instantiate and name series
            $.each(items, function (itemNo, item) {
                if (itemNo > 0) {
                    options.series.push({
                        name: names[itemNo - 1],
                        data: []
                    });
                }
            });
        } else {
            var date = [];
            $.each(items, function (itemNo, item) {
                //first set date associated with points
                if (itemNo === 0) {
                    date = item.split('/');
                } else {
                    if ( (item.trim() != 'NA') && (item != 0) ) {
                        //add data to respective series
                        options.series[itemNo - 1].data.push([Date.UTC(date[2], date[0] - 1, date[1]), (parseFloat(item) / scale)]);
                    }
                }
            });
        }
    });
}