const Controller = require('./controller/controller')

const argv = process.argv.slice(2)
const command = argv[0]
const params = argv.slice(1)
// console.log(params[1]);


switch (command) {
  case 'help' : Controller.help(); break
  case 'listEmployee' : Controller.list(); break
  case 'register' : Controller.addEmployee(params); break
  case 'login' : Controller.login(params); break
  case 'addPatient' : Controller.addPatient(params); break
  case 'logout' : Controller.logout(params); break
  default : Controller.help(); break
}


// $ node index.js help
// $ node index.js listEmployee
// $ node index.js register <your name> <username> <password> <position>
// $ node index.js login <username> <password>
// $ node index.js addPatient <patient name> <diagnosis>
// $ node index.js logout