const Controller = require('./Controller/controller')

const command = process.argv[2]
const params = process.argv.slice(3)

switch (command) {
    case 'help':
        Controller.showHelp()
        break
    case 'list':
        Controller.showList()
        break
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
    case 'listPatient':
        Controller.showPatient()
        break

    default:
        Controller.default()
        break;
}