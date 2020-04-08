const Controller = require('./controller')

const argv = process.argv.slice(2)
let command = argv[0]
let param = argv.slice(1)
// console.log(param)

switch(command){
    case 'help' : Controller.viewHelp(); break
    case 'register' : Controller.registerEmployee(param); break
    case 'viewAllEmployee' : Controller.viewAllEmployee(); break
    case 'login' : Controller.loginEmployee(param); break
    case 'logout' : Controller.logoutEmployee(); break
    case 'addPatient' : Controller.registerPatient(param); break
    case 'viewAllPatient' : Controller.viewAllPatient(); break
    default : Controller.viewHelp(); break
}