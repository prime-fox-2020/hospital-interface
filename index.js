const Controller = require('./Controllers/Controller')
const [cmd, ...params] = process.argv.slice(2)

// console.log(cmd, params)
switch (cmd) {
  case 'addPatient': Controller.addPatient(params); break
  case 'register': Controller.register(params); break
  case 'employees': Controller.showEmployee(); break
  case 'patients': Controller.showPatient(); break
  case 'login': Controller.login(params); break
  case 'logout': Controller.logout(); break
  case undefined:
  case 'help': Controller.help(); break
  default: Controller.errorCmd(cmd); break
}