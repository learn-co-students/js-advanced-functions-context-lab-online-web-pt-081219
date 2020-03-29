function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(el => {
        return createEmployeeRecord(el)
    })
}

function createTimeInEvent(timeStamp) {
    const timeSplit = timeStamp.split(' ');
    const dateTime = timeSplit[0];
    const hourTime = parseInt(timeSplit[1]);

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: hourTime,
        date: dateTime
    })

    return this;
}

function createTimeOutEvent(timeStamp) {
    const timeSplit = timeStamp.split(' ');
    const dateTime = timeSplit[0];
    const hourTime = parseInt(timeSplit[1]);

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: hourTime,
        date: dateTime
    })

    return this;
}

function hoursWorkedOnDate(queryDate) {
    const startingTime = this.timeInEvents.find(el => { return el.date === queryDate}).hour;
    const endingTime = this.timeOutEvents.find(el => { return el.date === queryDate}).hour;

    return (endingTime - startingTime) / 100;
}

function wagesEarnedOnDate(queryDate) {
    return this.payPerHour * hoursWorkedOnDate.call(this, queryDate)
}

// 
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(array) {
    const wages = array.map(el => {
        return allWagesFor.call(el)
    })

    return wages.reduce((memo, d) => { return memo + d})
}

function findEmployeeByFirstName(srcArray, queryName) {
    return srcArray.find(el => {
        return el.firstName === queryName
    })
}