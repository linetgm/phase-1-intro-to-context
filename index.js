// index.js

// Create an employee record
function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Create employee records from nested arrays
  function createEmployeeRecords(data) {
    return data.map(createEmployeeRecord);
  }
  
  // Add a time in event to an employee's record
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  // Add a time out event to an employee's record
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  // Calculate hours worked on a specific date for an employee
  function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Calculate wages earned on a specific date for an employee
  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    let wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
  }
  
  // Calculate total wages earned for all dates by an employee
  function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    let totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Calculate total payroll for all employees
  function calculatePayroll(employees) {
    let totalPayroll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll;
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  