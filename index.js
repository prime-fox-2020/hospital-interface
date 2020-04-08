const command = process.argv[2]
const params = process.argv.slice(3)
const Controller = require('./controller')


switch(command){
    case 'list':
        Controller.list()
        break;
    case 'register':
        Controller.register(params)
        break;
    case 'login':
        Controller.login(params)
        break;
    case 'logout':
        Controller.logout(params)
        break;
    case 'addPatient':
        break;
    case undefined:
        Controller.message("Masukkan command yang sesuai.")
        break;
    default:
        Controller.message("Command tidak sesuai! Masukkan lagi.")
        break;
}