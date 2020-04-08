const Controller = require('./Controllers/Controller')
const [cmd, ...params] = process.argv.slice(2)


console.log(cmd, params)
switch (cmd) {
  case 'employee': Controller.showEmployee(); break
  case 'register': Controller.register(params); break
  case 'login': Controller.login(params); break
  case 'addPatient': Controller.addPatient(params); break
  default: break;
}