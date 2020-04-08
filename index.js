const Controller = require('./controller/Controller')

const argv = process.argv.slice(2)
const command = argv[0]
const params = argv.slice(1)

switch (command) {
    case 'register':
        Controller.register(params)
        break;

    case 'login':
        Controller.login(params)
        break;
    
    case 'logout':
        Controller.logout()
        break;

    case 'addPatient':
        Controller.addPatient(params)
        break;  

    default:
        Controller.helper()
        break;
}