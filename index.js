const app = require('./controller');
const input = process.argv;

switch (input[2]) {
  case undefined: app.command(true); break;
  case 'register': app.register(input.slice(3)); break;
  case 'login': app.login(input.slice(3)); break;
  case 'addPatient': app.addPatient(input.slice(3)); break;
  case 'logout': app.logout(); break;
  default: app.command();
}