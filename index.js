let createEmployeeRecord = function(arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

let createEmployeeRecords = function(arry) {
    return arry.map((e) => {
        return createEmployeeRecord(e) 
    })
}

let createTimeInEvent = function(date) {
        let hour = date.split(" ")[1]
        let event = {
            type: "TimeIn",
            date: date.split(" ")[0],
            hour: parseInt(hour)
        }
        this.timeInEvents.push(event)
        return this
    }

let createTimeOutEvent = function(date) {
    let hour = date.split(" ")[1]
    let event = {
        type: "TimeOut",
        date: date.split(" ")[0],
        hour: parseInt(hour)
    }
    this.timeOutEvents.push(event)
    return this
}

let hoursWorkedOnDate = function(date) {
    let hourIn =  this.timeInEvents.find(event => event.date === date).hour
    let hourOut = this.timeOutEvents.find(event => event.date === date).hour
    let worked = (hourOut - hourIn)/ 100
    return worked
}


let wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    let wage = this.payPerHour
    return hours * wage
}



let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

  let calculatePayroll = function(records) {
        let total = records.reduce(function(memo, record) {
            return memo + allWagesFor.call(record)
        }, 0)
        return total
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