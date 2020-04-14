/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }
let createEmployeeRecord = function(element){
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
  }
  
  let createEmployeeRecords = function(empData) {
    return empData.map(function(row){
        return createEmployeeRecord(row)
    })
  }
  
  let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
  
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
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
  
  let hoursWorkedOnDate = function(time){
    let clockIn = this.timeInEvents.find(function(e){
        return e.date === time
    })
  
    let clockOut = this.timeOutEvents.find(function(e){
        return e.date === time
    })
  
    return (clockOut.hour - clockIn.hour) / 100
  }
  
  let wagesEarnedOnDate = function(time){
    let wage = hoursWorkedOnDate.call(this, time)
        * this.payPerHour
    return wage
  }
  
  let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })
  
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)
  
    return payable
  }
  
  let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)}, 0)
  } 
 