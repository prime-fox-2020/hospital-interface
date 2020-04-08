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
                        if (err) {
                            ViewHospital.displayError(err);
                        }
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

    static showHelp() {
        ViewHospital.help();
    }

    static commandNotFound() {
        ViewHospital.commandNotFound();
    }
}

module.exports = ControllerHospital;