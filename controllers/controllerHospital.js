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
                    const id = data[data.length-1].id + 1
                    data.push(ModelHospital.createOneEmployee(id, name, position, username, password));
                    ModelHospital.createAll('employee', data, (err) => {
                        if (err) {ViewHospital.displayError(err);}
                    });
                }
            });
        }
    }

    static showData(parameter) {
        ModelHospital.findAll('system', (err, system) => {
            if (err) {
                ViewHospital.displayError(err);
            } else {
                if (system[0].position == 'admin') {
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
                } else {
                    ViewHospital.notAdmin();
                }
            }
        });
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
                        ViewHospital.displayLoggedIn(system[0].user);}
                    else {
                        ModelHospital.findAll('employee', (err, data) => {
                            if (err) {
                                ViewHospital.displayError(err);}
                            else {
                                for (let employee of data) {
                                    if (employee.username == username && employee.password == password) {
                                        system[0].login = true;
                                        system[0].user = employee.name;
                                        system[0].position = employee.position;
                                        system[0].timeStamp = Date.now();
                                        ModelHospital.createAll('system', system, (err) => {
                                            if (err) {ViewHospital.displayError(err);}
                                        });
                                        ViewHospital.loginSucces(employee.name);
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

    static logout() {
        ModelHospital.findAll('system', (err, system) => {
            if (err) {
                ViewHospital.displayError();
            } else {
                system[0].login = false;
                system[0].user = "";
                system[0].position = "";
                system[0].timeStamp = "";
                ModelHospital.createAll('system', system, (err) => {
                    if (err) {ViewHospital.displayError(err);}
                });
                ViewHospital.logoutSucces();
            }
        });
    }

    static addPatient(patientData) {
        const name = patientData[0];
        const diagnosis = patientData.slice(1);
        ModelHospital.findAll('system', (err, data) => {
            if (err) {
                ViewHospital.displayError(err);}
            else {
                if (data[0].position == 'doctor') {
                    ModelHospital.findAll('patient', (err, data) => {
                        if (err) {
                            ViewHospital.displayError(err);
                        } else {
                            const id = data[data.length-1].id + 1;
                            data.push(ModelHospital.createOnePatient(id, name, diagnosis));
                            ModelHospital.createAll('patient', data, (err) => {
                                if (err) {ViewHospital.displayError(err);}
                            });
                            ViewHospital.addPatientSucces(data.length);
                        }
                    });
                } else {
                    ViewHospital.notDoctor();
                }
            }
        });
    }
    
    static showHelp() {
        ViewHospital.help();
    }

    static commandNotFound() {
        ViewHospital.commandNotFound();
    }
}

module.exports = ControllerHospital;