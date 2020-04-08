let Controller = require('./controller.js');

let command = process.argv[2];

if (command === 'register') {
    let objData = {
        username: process.argv[3],
        password: process.argv[4],
        role: process.argv[5]
    }
    Controller.register(objData);
} else if (command === 'login') {
    let objLogin = {
        username: process.argv[3],
        password: process.argv[4]
    }
    Controller.login(objLogin);
} else if (command === 'addPatient') {
    let objPatient = {
        id: process.argv[3],
        name: process.argv[4],
        diagnosis: process.argv.splice(5)
    }
    Controller.addPatient(objPatient);
} else {
    console.log('An error occured');
}