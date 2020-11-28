/* Your Code Here */
const createEmployeeRecord = (arr) => {
  const record = {
    "firstName":arr[0],
    "familyName":arr[1],
    "title":arr[2],
    "payPerHour":arr[3],
    "timeInEvents":[],
    "timeOutEvents":[]
  }
  return record
}

const createEmployeeRecords = (arr) => {
  return arr.map(emp => createEmployeeRecord(emp))
}

function createTimeInEvent(dateTime) {
  const sliceAt = dateTime.indexOf(" ")
  const date = dateTime.slice(0, sliceAt)
  const time = parseInt(dateTime.slice(sliceAt))
  const newEvent = {
    "type":"TimeIn",
    "date":date,
    "hour":time
  }
  this.timeInEvents.push(newEvent)
  return this
}

function createTimeOutEvent(dateTime) {
  const sliceAt = dateTime.indexOf(" ")
  const date = dateTime.slice(0, sliceAt)
  const time = parseInt(dateTime.slice(sliceAt))
  const newEvent = {
    "type":"TimeOut",
    "date":date,
    "hour":time
  }
  this.timeOutEvents.push(newEvent)
  return this
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(e => e.date === date).hour 
  const timeOut = this.timeOutEvents.find(e => e.date === date).hour
  return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(date) {
  const wage = this.payPerHour
  const hoursToday = hoursWorkedOnDate.call(this, date)
  return wage * hoursToday
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

const findEmployeeByFirstName = (arr, name) => {
  return arr.find(emp => emp.firstName === name)
}

function calculatePayroll(employeesArr) {
  employeesArr.reduce((acc, emp) => {
    return acc + allWagesFor.call(emp)
  }, 0)
}