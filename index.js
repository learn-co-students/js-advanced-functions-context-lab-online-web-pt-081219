let createEmployeeRecord = function ([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (empRecords){
    let createdEmployees = empRecords.map(createEmployeeRecord)
    return createdEmployees
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
    
}


let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let hoursWorkedOnDate = function (date) {
    //find timeInEvent for the date
    let inTime = this.timeInEvents.find((e) => e.date === date) 
    //find timeOutEvent for the date
    let outTime = this.timeOutEvents.find((e) => e.date === date)
    //find hours worked by subtracting time in from time out
    let hoursWorked = (outTime.hour - inTime.hour) / 100
    return hoursWorked
}

let wagesEarnedOnDate = function (date){
    let pay = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return pay
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

function findEmployeeByFirstName(records, firstName) {
    const empRecord = records.find((r) => r.firstName === firstName)
    return empRecord
}


function calculatePayroll(employees) {
    let allPay = employees.reduce((total, employee) => total + allWagesFor.call(employee), 0)
    return allPay
}; 

