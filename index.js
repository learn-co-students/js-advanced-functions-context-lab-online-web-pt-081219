/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(record) {
    let employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
};

function createEmployeeRecords(list){
    return list.map(function(employee){ return createEmployeeRecord(employee) })
};

let createTimeInEvent = function(date) {
    let time = date.split(' ')
    let timeLog = {
        type: "TimeIn",
        date: time[0],
        hour: parseInt(time[1])
    }
    this.timeInEvents.push(timeLog)
    return this
}

let createTimeOutEvent = function (date) {
    let time = date.split(' ')
    let timeLog = {
        type: "TimeOut",
        date: time[0],
        hour: parseInt(time[1])
    }
    this.timeOutEvents.push(timeLog)
    return this
}

let hoursWorkedOnDate = function(requestDate) {
    function matchDate(entry) {
        return entry.date === requestDate
    };
    let logIn = this.timeInEvents.find(matchDate)
    let logOut = this.timeOutEvents.find(matchDate)
    let findHours = logOut.hour - logIn.hour
    let hoursWorked = findHours * .01
    return hoursWorked
};

let wagesEarnedOnDate = function(requestDate) {
    let hoursWorked = hoursWorkedOnDate.call(this, requestDate)
    let payRate = this.payPerHour
    return hoursWorked * payRate
};


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

let calculatePayroll = function(employees) {
    let totalWages = 0
    employees.forEach(function (employee) {
        let wage = allWagesFor.call(employee)
        totalWages = totalWages + wage
        return totalWages
    })
    console.log(totalWages)
    return totalWages
};  

function findEmployeeByFirstName(employees, name) {
    let employee = employees.find(function (employee) {
        return employee.firstName === name
    })
    console.log(employee)
    return employee
}