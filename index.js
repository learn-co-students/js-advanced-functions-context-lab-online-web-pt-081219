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

let createEmployeeRecord = function(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

let createEmployeeRecords = function(employeeRowData) {
  return employeeRowData.map(function(row){
    return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(date){
  let inEvents = this.timeInEvents.find(function(e){
    return e.date === date
  })
  let outEvents = this.timeOutEvents.find(function(e){
    return e.date === date
  })
  return (outEvents.hour - inEvents.hour) / 100
}

let wagesEarnedOnDate = function(date){
  let rawWage = hoursWorkedOnDate.call(this, date)
  * this.payPerHour
  return parseFloat(rawWage.toString())
}

let findEmployeeByFirstName = function(srcArray, firstName){
  return srcArray.find(function(e){
    return e.firstName = firstName
  })
}

let calculatePayroll = function(numberOfEmployees){
  return numberOfEmployees.reduce(function(memo, record){
    return memo + allWagesFor.call(record)
  }, 0)
}
