// Function to create an employee record
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create employee records from an array of arrays
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event to the employee record
  function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  // Function to add a timeOut event to the employee record
  function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date);
    let timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor() {
    let eligibleDates = this.timeInEvents.map(e => e.date);
    let totalWages = eligibleDates.reduce((total, date) => {
      return total + wagesEarnedOnDate.call(this, date);
    }, 0);
    return totalWages;
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  // Function to calculate payroll for multiple employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor.call(record);
    }, 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
  };
  