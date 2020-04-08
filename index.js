const ControllerHospital = require('./controllers/controllerHospital');

const command = process.argv.slice(2, 3)[0];
const parameter = process.argv.slice(3);

switch(command) {
    case 'help': ControllerHospital.showHelp(); break;
    case 'login': ControllerHospital.login(parameter); break;
    case 'logout': ControllerHospital.logout(); break;
    case 'showData': ControllerHospital.showData(parameter); break;
    case 'register': ControllerHospital.register(parameter); break;
    case 'addPatient': ControllerHospital.addPatient(parameter); break;
    default: ControllerHospital.commandNotFound(); break;

}