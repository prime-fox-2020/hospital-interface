const argv = process.argv.slice(2);
const command = argv[0];
const params = argv.slice(1);
const Controller = require('./controller');

switch (command) {
	case 'register':
		Controller.register(params);
		break;
	case 'login':
		Controller.login(params);
		break;
	case 'addPatient':
		Controller.addPatient(params);
		break;
}
