const Controller = require('./controllers/controller')

const argv = process.argv[2]
const cmd = process.argv.slice(3)

switch (argv) {
    case 'register':
        Controller.register(cmd)
        break;
    case 'login':
        Controller.login(cmd)
        break;
    case 'logout':
        Controller.logout()
        break;
    case 'addPatient':
        Controller.addPatient(cmd)
        break;

    default:
        break;
}