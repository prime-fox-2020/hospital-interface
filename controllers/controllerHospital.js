const ViewHospital = require('../views/viewHospital.js');
const ModelHospital = require('../models/modelHospital.js');

class ControllerHospital {
    static register(data) {
        if (data.length != 4) {
            ViewHospital.showHelpWrongFormat();
            ViewHospital.showHelpRegister();
        } else {
            const name = data[0]; const position = data[1]; const username = data[2]; const password = data[3];
            ModelHospital.findAll('employee', (err, data) => {
                if (err) {
                    ViewHospital.displayError(err);
                } else {
                    const newEmployee = ModelHospital.createOneEmployee(name, position, username, password);
                    data.push(newEmployee);
                    ModelHospital.createAll('employee', data, (err) => {
                        if (err) {ViewHospital.displayError(err);}
                    });
                }
            });
        }
    }

    static showData(parameter) {
        let status = ''; 
        switch (parameter[0]) {
            case undefined: status = 'patient'; break;
            case 'patient': 
            case 'employee': status = parameter[0]; break;
            default: status = 'wrong';
        }
        if (status != 'wrong') {
            ModelHospital.findAll(status, (err, data) => {
                if (err) {
                    ViewHospital.displayError(err);
                } else {
                    ViewHospital.displayData(data);
                }
            });
        } else {
            ViewHospital.showHelpWrongFormat();
            ViewHospital.showHelpDisplay();
        }
    }

    static login(userPass) {
        if (userPass.length > 2 || userPass.length == 0) {
            ViewHospital.showHelpWrongFormat();
            ViewHospital.showHelpLogin();
        } else {
            const username = userPass[0];
            const password = userPass[1];
            ModelHospital.findAll('system', (err, system) => {
                if (err) {
                    ViewHospital.displayError(err);}
                else {
                    if (system[0].login) {
                        ViewHospital.displayLoggedIn();}
                    else {
                        ModelHospital.findAll('employee', (err, data) => {
                            if (err) {
                                ViewHospital.displayError(err);}
                            else {
                                for (let employee of data) {
                                    if (employee.username == username && employee.password == password) {
                                        system[0].login = true;
                                        system[0].user = employee.name;
                                        ModelHospital.createAll('system', system, (err) => {
                                            if (err) {ViewHospital.displayError(err);}
                                        });
                                        ViewHospital.loginSuccesfull(employee.name);
                                        break;
                                    }
                                }
                                if (!system[0].login) {ViewHospital.wrongUserPass();}
                            }
                        }); 
                    }
                }
            });
        }
        
    }

    static showHelp() {
        ViewHospital.help();
    }

    static commandNotFound() {
        ViewHospital.commandNotFound();
    }
}

module.exports = ControllerHospital;