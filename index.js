function createEmployeeRecord(employee) {
    return {
        firstName: employee[0], 
        familyName: employee[1], 
        title: employee[2], 
        payPerHour: employee[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}; 

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}; 

function createTimeInEvent(timeInStamp) {
    let [date, time] = timeInStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(time, 10), 
        date: date
    })
    return this 
}; 

function createTimeOutEvent(timeOutStamp) {
    let [date, time] = timeOutStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(time, 10), 
        date: date
    })
    return this
}; 

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(day => day.date === date)
    let timeOut = this.timeOutEvents.find(day => day.date ===date)
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100 
    return hoursWorked
}; 

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}; 

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}; 

function calculatePayroll(employees) {
    let payroll = employees.reduce((total, employee) => total + allWagesFor.call(employee), 0)
    return payroll 
}; 


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