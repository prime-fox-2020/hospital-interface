const Controller = require('./controller/controller')

const argv = process.argv.slice(2)
const command = argv[0]
const params = argv.slice(1)

switch(command){
    case 'help' : Controller.showMsg('help'); break
    case 'register' : Controller.register(params) ; break
    case 'login' : Controller.login(params); break
    case 'logout' : Controller.logout(); break
    case 'showEmployee' : Controller.showEmployee(); break
    case 'addPatient' : Controller.addPatient(params); break
    case 'showPatient' : Controller.showPatient(); break
    case 'deletePatient' : Controller.deletePatient(Number(params[0])); break
    default : Controller.showMsg('Command tidak ditemukan'); break
}