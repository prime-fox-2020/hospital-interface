const Controller = require('./controller/controller')

const argv = process.argv.slice(2)
const command = argv[0]
const param = argv.slice(1)


switch(command) {
    case 'help' : Controller.help();break
    case 'list' : Controller.list();break
    case 'register' : Controller.regist(param);break
    case 'login' : Controller.login(param);break
    case 'addPatient' : Controller.addPatient(param);break
    case 'logout' : Controller.logout();break
    default: Controller.help();break
}

