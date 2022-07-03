
const dates = []

function makedatearray() {
    for (let i = 0; i < 5; i++) {
                        
        var fdate = moment().add(i, "day").format("YYYY-MM-DD");
        dates[i] = fdate;
        
        
    }
}


makedatearray();
console.log(dates);


// change date format
var printDates = []

function dateFormatArray() {
    for (let i = 0; i < 5; i++) {
                        
        var dateFormat = moment(dates[i]).format('l');
        printDates[i] = dateFormat;
        
        
    }
}

dateFormatArray();
// console.log(printDates);