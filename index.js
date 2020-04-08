const Controller = require('./controller');
const argv = process.argv.slice(2);
const command = argv[0];
const input = argv.slice(1);

switch (command) {
  case "help": Controller.help(); break;
  case "showE": Controller.showEmployee(); break;
  case "registerE": Controller.registerE(input); break;
  case "login": Controller.login(input); break;
  case "addPatient": Controller.registerP(input); break;
  case "showP": Controller.showPatient(); break;
  case "logout": Controller.logout(input); break;
  default: Controller.help(); break;

}
