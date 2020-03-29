/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(record) {
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(employees) {
    employees = employees.map(employee => {
        return createEmployeeRecord(employee);
    });
    return employees;
}

function createTimeInEvent(time) {
    let [date, hour] = time.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this
}

function createTimeOutEvent(time) {
    let [date, hour] = time.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(workingDate) {
    let inEvent = this.timeInEvents.find(event => event.date === workingDate);
    let outEvent = this.timeOutEvents.find(event => event.date === workingDate);
    try {
        return (outEvent.hour - inEvent.hour) / 100;
    } catch (e) {
        console.error(e.name + ": " + e.message);
        console.error("Missing date field!");
    }
}

function wagesEarnedOnDate(workingDate) {
    let hoursWorked = hoursWorkedOnDate.call(this, workingDate);
    return hoursWorked * this.payPerHour;
}

function allWagesFor() {
    let dates = this.timeInEvents.map(event => event.date);

    let payable = dates.reduce(add, 0);

    let add = function fun(total, wage) {
        return total + wage;
    }.bind(this);

    return payable;
}

function calculatePayroll(employees) {
    let allPayroll = employees.map(employee => allWagesFor.call(employee));

    let totalPayroll = allPayroll.reduce(add, 0);

    function add(total, wage) {
        return total + wage;
    }

    return totalPayroll;
}

function findEmployeeByFirstName(employees, firstName) {
    let employee = employees.find(emp => emp.firstName == firstName);
    return employee;
}


// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }