/* Your Code Here */

function createEmployeeRecord(array){ 
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ')

    this.timeInEvents.push ({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ')

    this.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = function(searchDate){
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === searchDate
    })

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === searchDate
    })
    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(searchDate){
    return hoursWorkedOnDate.call(this, searchDate) * this.payPerHour
}

let calculatePayroll = function(employeesArray){
    return employeesArray.reduce(function(memo, d){
        return memo + allWagesFor.call(d)
    }, 0)
}

let findEmployeeByFirstName = function(employeesArray, input){
    return employeesArray.find(function(e){
        return e.firstName === input 
    })
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}