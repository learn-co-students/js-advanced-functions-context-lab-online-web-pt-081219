/* Your Code Here */

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

function createEmployeeRecord(arr){
    let employee = {};
    employee.firstName = arr[0];
    employee.familyName = arr[1];
    employee.title = arr[2];
    employee.payPerHour = arr[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(arrs){
    let employees = [];
    arrs.forEach(element => {
        let newEmployee = createEmployeeRecord(element);
        employees.push(newEmployee);
    });
    return employees;
}

function createTimeInEvent(date){
    let event = {};
    event.type = "TimeIn";
    let times = date.split(" ");
    event.date = times[0];
    event.hour = parseInt(times[1]);
    this.timeInEvents.push(event);
    return this;
}

function createTimeOutEvent(date){
    let timeOutEvent = {};
    timeOutEvent.type = "TimeOut";
    let times = date.split(" ");
    timeOutEvent.date = times[0];
    timeOutEvent.hour = parseInt(times[1]);
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find(x => x.date == date);
    let timeOut = this.timeOutEvents.find(x => x.date == date);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;

}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(x => x.firstName == firstName);
}

function calculatePayroll(employees){
    let total = 0;
    employees.forEach(employee =>
        total +=  allWagesFor.call(employee)
    );
    return total;
}