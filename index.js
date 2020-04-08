const Controller = require('./controllers/controller');
const command = process.argv[2];
const params = process.argv.slice(3);

switch(command){
    case 'listEmployee':
        Controller.listEmployee();
        break;
    case 'listPatient':
        Controller.listPatient();
        break;
    case 'register':
        Controller.register(params);
        break;
    case 'login':
        Controller.login(params);
        break;
    case 'addPatient':
        Controller.addPatient(params);
        break;
    case 'logout':
        Controller.logout();
    default:
        break;
}