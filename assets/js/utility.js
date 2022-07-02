
const dates = []

function makedatearray() {
    for (let i = 0; i < 5; i++) {
                        
        var fdate = moment().add(i, "day").format("YYYY-MM-DD");
        dates[i] = fdate;
        
        
    }
}


makedatearray();
console.log(dates);





