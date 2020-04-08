const fs = require('fs');
const controller = require('./controller');

let input = process.argv.slice(2);
switch(input[0]) {
    case 'help' : controller.help(); break;
    case 'addEmployee' : controller.addEmployee(input.slice(1)); break;
    case 'register' : controller.employeeLogin(input.slice(1)); break;
    case 'addPatient' : controller.addPatient(input.slice(1)); break;
}   