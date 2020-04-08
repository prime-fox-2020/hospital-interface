const Controller = require('./Controller/controller.js')
let command_1 = process.argv[2]
let params = process.argv.slice(3)

switch (command_1) {
    case 'help':
        Controller.help();
        break;
    
    case 'list:employee':
        Controller.listEmployee();
        break;

    case 'list:patient':
        Controller.listPatient();
        break;

    case 'register:employee':
        Controller.registerEmployee(params);
        break;

    case 'login':
        Controller.login(params);
        break

    case 'add:patient':
        Controller.addPatient(params);
        break

    case 'logout':
        Controller.logout();
        break

    default:
        Controller.kosong();
        break;
}
