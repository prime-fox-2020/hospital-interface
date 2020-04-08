const {Crud, Patient} = require('../models')
const Doctor = require('../models/doctors')
const Admin = require('../models/admins')
const Receptionist = require('../models/receptionists')
const OB = require('../models/obs')
const Views = require('../views')

class Controller {

    static login = (username, password) => {
        Crud.pool('employee', (error, data) => {
            if (error) {
                Views.showErrors('unknown');
                return;
            } else {
                Crud.inSession(username, (err, result) => {
                    if (result.length !== 0) {
                        Views.showErrors('in_session', result[0].user);
                        return;
                    } else {
                        Crud.login(data, username, password, (error, data) => {
                            if (error) {
                                Views.showErrors('password');
                                return
                            } else {
                                Views.showMessage('login_success', data.name);
                                Views.showMessage('motd');
                                // update session login
                                Crud.session(username);
                            }
                        })

                    }
                })

            }
        })
    }

    static register = (registeringWhat, content) => {
        Crud.pool(registeringWhat, (error, data) => {
            if (error) {
                Views.showErrors('unknown');
                return;
            } else {

                const staff = ['dokter', 'admin', 'resepsionis', 'officeboy'];
                let NewObject;
                
                content = content.split(',');

                if (staff.includes(content[1])) {

                    switch (content[1]) {
                        case 'dokter' : NewObject = new Doctor(data.length + 1, content[0], content[1], content[3], content[3]); break;
                        case 'admin' : NewObject = new Admin(data.length + 1, content[0], content[1], content[3], content[3]); break;
                        case 'resepsionis' : NewObject = new Receptionist(data.length + 1, content[0], content[1], content[3], content[3]); break;
                        case 'officeboy' : NewObject = new OB(data.length + 1, content[0], content[1], content[3], content[3]); break;
                    }

                } else {

                    NewObject = new Patient(data.length + 1, content[0], content[1].split(','))

                }

                Crud.newData(data, NewObject)

            }
        })
    }

    static logout() {
        Crud.destroy((err, data) => {
            Views.showMessage('logout', data)
        })
    }

    static help() {
        Views.showMessage('motd')
    }

}

module.exports = Controller