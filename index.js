let Controller = require('./controller')
let input = process.argv.slice(2)
let command = input[0]
let parameter = input.slice(1)
// console.table(parameter)

switch(command){
    case 'help':
        Controller.help();
    break;
    case 'register':
        Controller.register(parameter);
    break;
    case 'login':
        Controller.login(parameter);
    break;
    case 'logout':
        Controller.logout();
    break;
    case 'addPatient':
        Controller.addPatient(parameter);
    break;
    default:
        Controller.help();
    break;

}