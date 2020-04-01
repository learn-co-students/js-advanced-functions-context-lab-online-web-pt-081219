/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(array) {
    return array.map(e => createEmployeeRecord(e))
};

function createTimeInEvent(date) {
    let punch = date.split(" ")
    let timein = {
      type: "TimeIn",
      hour: parseInt(punch[1]),
      date: punch[0]
    }
    this.timeInEvents.push(timein)
    return this
};

function createTimeOutEvent(date) {
    let punch = date.split(" ")
    let timein = {
      type: "TimeOut",
      hour: parseInt(punch[1]),
      date: punch[0]
    }
    this.timeOutEvents.push(timein)
    return this
};

function hoursWorkedOnDate(date) {
    let inPunch = this.timeInEvents.find(e => e.date === date)
    let outPunch = this.timeOutEvents.find(e => e.date === date)
    let hoursWorked = (outPunch.hour - inPunch.hour) / 100
    return hoursWorked
};

function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
};

function findEmployeeByFirstName(src, name) {
    return src.find(emp => emp.firstName === name)
};

function calculatePayroll(employees) {
    let payroll = employees.reduce((total, record) => total + allWagesFor.call(record), 0)
    return payroll
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