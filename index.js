'use strict'

const argv = process.argv.slice(2);
const command = argv[0];
const params = argv.slice(1);
const controller = require('./controller')

switch (command) {
    case 'list' : {
        controller.showData(params);
        break;
    }
    case 'register' : {
        controller.manageData(argv);
        break;
    }
    case 'login' : {
        controller.login(params);
        break;
    }
    case 'addPatient' : {
        controller.manageData(argv);
        break;
    }
    case 'logout' : {
        controller.logout();
        break;
    }

}